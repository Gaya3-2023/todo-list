const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
    turnOffLoading:'turnOffLoading',
};
let initialState ={
    todoList: [],
    isLoading: false,
    isSaving:false,
    errorMessage:"",    
}
function reducer(state = initialState, action) {
  switch (action.type) 
  {
    case actions.turnOffLoading:
        return{ ...state,isLoading:false};

    case actions.fetchTodos:   
      return { ...state, isLoading:true  };

    case actions.loadTodos: 
     {     
       const list = action.records.map((record) => {
        let todo ={id : record.id, ...record.fields};
        if(!record.fields.isCompleted){
            todo.isCompleted=false;
        }
        return todo;
       });
        return {...state,todoList:[...list],isLoading:false};
    }//end of case loadTkodos
    
    case actions.setLoadError:        
        return{ ...state,errorMessage:action.errorMessage,isLoading:false};

    case actions.startRequest:  
        return { ...state,isSaving :true};

    case actions.addTodo: 
    {
         const savedTodo = { id: action.records[0].id,
                             title:action.records[0].fields.title,
         };   
          if(!action.records[0].fields.isCompleted){
            savedTodo.isCompleted=false;
          }
         return {...state,todoList:[...state.todoList,savedTodo],isSaving:false}   ;
    }    //end of addTodos

    case actions.endRequest: 
         return{ ...state,isLoading:false,isSaving:false};
    
    case actions.revertTodo:  
    {
             const updatedTodos = action.records.map((todos) => {
             if(todos.id === action.editedTodo.id){
                   return { ...action.editedTodo };
             }
             return todos;
            });
             const updatedState = { ...state,todoList:updatedTodos,};
             if(action.errorMessage){                
                updatedState.errorMessage=`${action.errorMessage}. Reverting todo...`;
             }
             return updatedState;   
    }  //end of revertTodo       
    case actions.updateTodo: 
    {        
         const updatedTodos = action.records.map((todos) => {
             if(todos.id === action.editedTodo.id){
                   return { ...action.editedTodo };
             }
             return todos;
            });
             const updatedState = { ...state,todoList:updatedTodos,};
             if(action.error){
                updatedState.errorMessage=`${action.errorMessage}`;
             }
             return updatedState;       
        }
       //end of update todos

    case actions.completeTodo: 
    {       
         const updatedTodos = action.records.map((toDo) => {
            if(toDo.id === action.id){
                return{ ...toDo,isCompleted:true};
            }
            else{
                return toDo;
            }
         });
        return{...state,todoList: updatedTodos};
    }  //end of complete Todos
     
    case actions.clearError:
        return {...state,errorMessage: ""};
    
    default:
        return state;    
            
    }//end of the case
}//end of function
export {initialState,reducer,actions};