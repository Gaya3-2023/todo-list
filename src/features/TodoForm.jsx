{/*TodoForm component*/}
import {useRef,useState} from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledButton = styled.button`          
          font-style : ${(props) => (props.disabled ? 'italic' : 'none')};
          font-weight:800;
          `; 

const StyledForm = styled.form`
          padding:10px;
          `;      

function TodoForm({onAddTodo,isSaving}){
    const [workingTodoTitle,setWorkingTodoTitle] = useState('');
    const todoTitleInput = useRef();

    function handleAddTodo(event){
     event.preventDefault();
     onAddTodo(workingTodoTitle);
     setWorkingTodoTitle('');
     todoTitleInput.current.focus();
    }
    return(
        <StyledForm onSubmit={handleAddTodo}>
            <TextInputWithLabel ref={todoTitleInput} value={workingTodoTitle} 
            onChange = {(event) => setWorkingTodoTitle(event.target.value)} elementId="todoTitle" label="Todo"/>
            <StyledButton disabled = {workingTodoTitle.trim() === '' ? true : false}>{isSaving ? 'Saving...' : 'Add Todo'} </StyledButton>
        </StyledForm>
    )
}
export default TodoForm;