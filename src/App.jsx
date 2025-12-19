import { useState } from 'react';
import './App.css';
import TodoList from './TodoList.jsx';
import TodoForm from './TodoForm.jsx';

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
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onCompleteTodo={completeTodo}/>  
    </div>
  );
}

export default App;
