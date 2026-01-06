{/*TodoForm component*/}
import {useRef,useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';

function TodoForm({onAddTodo}){
    const [workingTodoTitle,setWorkingTodoTitle] = useState('');
    const todoTitleInput = useRef();

    function handleAddTodo(event){
     event.preventDefault();
     onAddTodo(workingTodoTitle);
     setWorkingTodoTitle('');
     todoTitleInput.current.focus();
    }
    return(
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel ref={todoTitleInput} value={workingTodoTitle} 
            onChange = {(event) => setWorkingTodoTitle(event.target.value)} elementId="todoTitle" labelText="Todo"/>
            <input type="submit" value="Add Todo"  disabled = {workingTodoTitle === ''? true : false} />
        </form>
    )
}
export default TodoForm;