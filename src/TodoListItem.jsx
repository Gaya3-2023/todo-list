function TodoListItem({todo,onCompleteTodo}){
 return(
    <li>
        <form>
            <input type='checkbox' checked={todo.isCompleted} 
            onChange = {() => onCompleteTodo({id:todo.id})}/>
            {todo.title}
        </form>        
    </li>
 )
}
export default TodoListItem;