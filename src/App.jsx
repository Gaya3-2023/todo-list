import { useState,useEffect, useCallback,useReducer } from 'react';
import { Routes,Route,useLocation } from 'react-router';
import './App.css';
import styles from './App.module.css';
import TodosPage from './pages/TodosPage.jsx';
import Header from './shared/Header.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodoState,
} from './reducers/todos.reducer.js';

function App() { 
  const [sortField,setSortField] = useState('createdTime');
  const [sortDirection,setSortDirection] = useState('desc');
  const [queryString,setQueryString] = useState('');
  const [title,setTitle] = useState("Todo List");

  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const headers = {"Authorization":token, 'Content-Type': 'application/json',}
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

  const [todoState, dispatch] = useReducer(todosReducer, initialTodoState);

  /*function encodeUrl*****/
   const encodeUrl = useCallback(() => {
         let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
         let searchQuery='';
         if(queryString){   
            searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;    
         }
         return encodeURI(`${url}?${sortQuery}${searchQuery}`);
    },[url,sortField, sortDirection,queryString])
  /***end of function encodeUrl */

  const location = useLocation();
 
  
  useEffect(() =>{
    
    if(location.pathname === "/"){
       setTitle("Todo List");
    }
    else if(location.pathname === "/about"){
     setTitle("About");
    }
    else{
      setTitle("Not Found");
    }
     document.title= title;
  },[location.pathname,title])
 
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
       const options ={method: 'GET', headers};
       try{
           const resp = await fetch(encodeUrl(),options);
           if (!resp.ok){
               throw new Error(`Fetch Error! status: ${resp.status}`);  
           } 
           const response = await resp.json();
           dispatch({type:todoActions.loadTodos,records:response.records}) ;       
         }
         catch(error){
               dispatch({type:todoActions.setLoadError,error:error});
         }
        
      };
      fetchTodos();
}, [sortDirection,sortField,queryString])  //End of useEffect
  
/*********addTodo********** */
  async function addTodo(newTodo){
    const payload = {
      records :[{fields:{ title:newTodo,isCompleted:false,},},]
    }
    const options = {
      method: 'POST',
      headers,
      body:JSON.stringify(payload),
    }
    try{
      dispatch({type:todoActions.startRequest}); 
      const resp = await fetch(encodeUrl(),options);
      if(!resp.ok){
        throw new Error(`AddTodo Fetch Url Error! status: ${resp.status}`);   
      }        
      const {records} = await resp.json();     
      dispatch({type:todoActions.addTodo,records:records});
    }
    catch(error){
     dispatch({type:todoActions.setLoadError,error:error});
    }
    finally{
      dispatch({type:todoActions.endRequest}); 
    } 
  } //end of addTodo

/*********updateAirtable function for update and complete todo******* */
 async function updateAirtable(payload,originalTodo){
     const options = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    }
    try{
      const resp = await fetch(encodeUrl(),options);
      if(!resp.ok){
       throw new Error(`Update Airtable Fetch Url Error! status: ${resp.status} `);   
      }
    }
    catch(error){
     dispatch({type:todoActions.setLoadError,error:error});
     dispatch({type:todoActions.revertTodo,editedTodo:originalTodo,error:error});
    }
    finally{
      dispatch({type:todoActions.endRequest}); 
    }

  }  
/******completeTodo******/
 async function completeTodo({id}){
    const originalTodo = todoState.todoList.find((todo) => todo.id === id); 
    dispatch({type:todoActions.completeTodo,id});
    const payload ={
      records: [{  id: id,  fields:{ isCompleted:true }} ]
    }
    updateAirtable(payload,originalTodo);
  } //end of completeTodo

  
/******updateTodo******/
 async function updateTodo({editedTodo}){    
     const originalTodo = todoState.todoList.find((todo) => todo.id === editedTodo.id) 
     dispatch({type:todoActions.updateTodo,originalTodo,editedTodo});
    const payload = {
        records: [
          {
            id: editedTodo.id,
            fields: {
              title: editedTodo.title,
              isCompleted:editedTodo.isCompleted,
            }
          }
        ]
   }
    updateAirtable(payload,originalTodo);
        
  }// end of updateTodo
  return (
    <div className={styles.centerbody}>
       <Header title={title} /> 
       <Routes>
        <Route path="/"
               element ={
                <TodosPage onAddTodo={addTodo} isSaving={todoState.isSaving}
                           todoList={todoState.todoList} onCompleteTodo={completeTodo} 
                           onUpdateTodo={updateTodo} isLoading={todoState.isLoading}
                           sortDirection={sortDirection} setSortDirection={setSortDirection} 
                           sortField={sortField} setSortField={setSortField}
                           queryString={queryString} setQueryString={setQueryString}
                />
               }/>
          <Route path="/about" element ={<About/>} />
          <Route path="/*" element={<NotFound/>}   />  
      </Routes>
      {todoState.errorMessage  && (<div className={styles.errormsg}><hr/><p>{todoState.errorMessage}</p>
       <input type="button" value="Dismiss Error Message" onClick ={()=> dispatch({ type: todoActions.clearError })}/>
       </div>)
       }     
    </div>
  );
}

export default App;
