import {useState,useEffect} from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({todo,onCompleteTodo,onUpdateTodo}){
    const [isEditing,setIsEditing] = useState(false);
    const [workingTitle,setWorkingTitle] = useState(todo.title);

     useEffect(() => { 
            setWorkingTitle(todo.title);
     }, [todo]) 

    function handleCancel()
    {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }
    function handleEdit(event)
    {
        setWorkingTitle(event.target.value);
    }
    function handleUpdate(event){
        if (!isEditing)
     { return ;}
     event.preventDefault();
     onUpdateTodo({ editedTodo: { ...todo, title: workingTitle } });
     setIsEditing(false)
  }
    
 return(
    <li>
        <form onSubmit={handleUpdate}>
            { isEditing ? (
                <>
                <TextInputWithLabel  value={workingTitle} onChange = {handleEdit} />
                <input type="button" onClick={handleCancel} value="Cancel"/>
                <input type="button" onClick={handleUpdate} value="Update"/>
                </>
            ) : (            
            <>
            <label>
            <input type='checkbox' checked={todo.isCompleted}  id={`checkbox${todo.id}`}
            onChange = {() => onCompleteTodo({id:todo.id})}/>
            </label>                    
            <span onClick = {()=> setIsEditing(true)}>{todo.title}</span>
            </>
            )}
        </form>        
    </li>
 )
}
export default TodoListItem;