import { useState } from 'react';
import './App.css';
import TodoList from './features/TodoList/TodoList.jsx';
import TodoForm from './features/TodoForm.jsx';

function App() {  

  const [todoList,setTodoList] = useState([]);
  
  function addTodo(title){
    const newTodo =  {title, id:Date.now(),isCompleted:false};
    setTodoList([...todoList,newTodo]);
  }

  function completeTodo({id}){
    const updatedTodos = todoList.map((todos) => {
      if(todos.id === id) {        
        return { ...todos, isCompleted:true};
       } 
       return todos;
    }); 
     setTodoList(updatedTodos);      
  }
  function updateTodo({editedTodo}){
      
    const updatedTodos = todoList.map((todos) => {
      if(todos.id === editedTodo.id){
        return { ...todos, title:editedTodo.title};
      }
      return todos;
    });
    setTodoList(updatedTodos);    
  }
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo}/>  
    </div>
  );
}

export default App;
