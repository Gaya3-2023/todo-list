import { useState,useEffect } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';
import TodosViewForm from './features/TodosViewForm.jsx';


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

/*function encodeUrl****/
const encodeUrl = ({ sortField, sortDirection,queryString}) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery='';
  
  if(queryString){   
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;    
  }
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};
/***End of encodeUrl function */

function App() {  

  const [todoList,setTodoList] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [isSaving,setIsSaving]= useState(false);
  const [sortField,setSortField] = useState('createdTime');
  const [sortDirection,setSortDirection] = useState('desc');
  const [queryString,setQueryString] = useState('');

  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const headers = {"Authorization":token, 'Content-Type': 'application/json',}

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
       const options ={method: 'GET', headers};
       try{
           const resp = await fetch(encodeUrl({sortField,sortDirection,queryString}),options);
           if (!resp.ok){
              throw new Error(resp.message);
           } 
           const response = await resp.json();
           const fetchedValues = response.records.map((record) => {
           const todo = {  id: record.id, ...record.fields, };                  
                 if(!todo.isCompleted){
                   todo.isCompleted= false;
                  }
                  return todo;
               })
               setTodoList([...fetchedValues]);    
            
         }
         catch(error){
              setErrorMessage(error.message);
         }
         finally{
              setIsLoading(false);
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
      setIsSaving(true);
      const resp = await fetch(encodeUrl({sortField,sortDirection,queryString}),options);
      if(!resp.ok){
        throw new Error(resp.message)
      }        
      const {records} = await resp.json();     
      const savedTodo = { id:records[0].id, ...records[0].fields, }
      if(!records[0].fields.isCompleted){
        savedTodo.isCompleted= false;
      }
      setTodoList([...todoList,savedTodo]);
    }
    catch(error){
     setErrorMessage(error.message);
    }
    finally{
      setIsSaving(false);
    } 
  } //end of addTodo

/*********updateAirtable function for update and complete todo******* */
 async function updateAirtable(payload,originalTodo,updatedTodos){
     const options = {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    }
    try{
      const resp = await fetch(encodeUrl({sortField,sortDirection,queryString}),options);
      if(!resp.ok){
        throw new Error(resp.message)
      }
      setTodoList(updatedTodos);     

    }
    catch(error){
      setErrorMessage(`${error.message}.Reverting todo ...`);
      const revertedTodos = todoList.map((todo) => todo.id===originalTodo.id ? originalTodo : todo);
      setTodoList([...revertedTodos]);
    }
    finally{
      setIsSaving(false);
    }

  }  
/******completeTodo******/
 async function completeTodo({id}){
    const updatedTodos = todoList.map((todos) => {
      if(todos.id === id) {        
        return { ...todos, isCompleted:true};
       } 
       return todos;
    }); 
    const originalTodo = todoList.find((todo) => todo.id === id);
    const payload ={
      records: [{  id: id,  fields:{ title:originalTodo.title,isCompleted:true, }} ]
    }
    updateAirtable(payload,originalTodo,updatedTodos);
  } //end of completeTodo

  
/******updateTodo******/
 async function updateTodo({editedTodo}){
      
    const updatedTodos = todoList.map((todos) => {
      if(todos.id === editedTodo.id){
        return { ...todos, title:editedTodo.title};
      }
      return todos;
    });
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id) 
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
    updateAirtable(payload,originalTodo,updatedTodos);
        
  }// end of updateTodo
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading}/> 
      <hr/>
       <TodosViewForm sortDirection={sortDirection} setSortDirection={setSortDirection} 
                      sortField={sortField} setSortField={setSortField}
                      queryString={queryString} setQueryString={setQueryString} />
       {errorMessage  && <div><hr/><p>{errorMessage}</p>
       <input type="button" value="Dismiss Error Message" onClick ={()=> setErrorMessage('')}/>
       </div>
       }     
    </div>
  );
}

export default App;
