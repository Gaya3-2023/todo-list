{/* extract from TodoList.jsx */}
import TodoListItem from "./TodoListItem.jsx";
import styles from './TodoList.module.css';
import { useSearchParams,useNavigate } from "react-router";
import {useEffect} from 'react';

function TodoList({todoList,onCompleteTodo,onUpdateTodo,isLoading}) {
 
   let filteredTodoList = todoList.filter(todos => { return todos.isCompleted === false});
   
   const [searchParams,setSearchParams] = useSearchParams();
    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const indexOfFirstTodo = (currentPage - 1)*itemsPerPage;
    const totalPages = Math.ceil(filteredTodoList.length/itemsPerPage);  
    const navigate= useNavigate();

   filteredTodoList = filteredTodoList.slice(indexOfFirstTodo,indexOfFirstTodo + itemsPerPage);

   useEffect(() =>  {
      if(totalPages > 0 ){
           if(isNaN(currentPage) || currentPage < 1 ||  currentPage  > totalPages){
               navigate('/');
           }    
       }
    },[currentPage,totalPages,navigate]);

    function handlePreviousPage(){
        if (currentPage > 1) {
            setSearchParams({page:currentPage - 1});
        }      
    }
    function handleNextPage(){
          if (currentPage < totalPages) {
            setSearchParams({page: currentPage + 1});
        }
    };

 return(
    <>
    {
         (isLoading ? <p>Todo list Loading...</p> : (
     (filteredTodoList.length === 0) ? (<p>Add todo above to get started</p>) :
     ( <>
       <ul className={styles.nobullets}>
         {filteredTodoList.map(todo => <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} onUpdateTodo={onUpdateTodo}/>)}
        </ul>
        <div className={styles.paginationControls}>
            <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
             <span>
                Page {currentPage} of {totalPages}
            </span>
            <button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
            </div> 
         </>
         )
 ) ) }
    </>
 )
}
export default TodoList;