{/* extract from TodoList.jsx */}
import TodoListItem from "./TodoListItem.jsx";
import styles from './TodoList.module.css';

function TodoList({todoList,onCompleteTodo,onUpdateTodo,isLoading}) {
 
   const filteredTodoList = todoList.filter(todos => { return todos.isCompleted === false});
   
 return(
    <>
    {
         (isLoading ? <p>Todo list Loading...</p> : (
     (filteredTodoList.length === 0) ? (<p>Add todo above to get started</p>) :
     ( <ul className={styles.nobullets}>
         {filteredTodoList.map(todo => <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo}/>)}
        </ul> )
 ) ) }
    </>
 )
}
export default TodoList;