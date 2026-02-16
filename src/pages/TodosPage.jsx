import TodoList from '../features/TodoList/TodoList.jsx'
import TodoForm from '../features/TodoForm.jsx'
import TodosViewForm from '../features/TodosViewForm.jsx';

export default function TodosPage(
    {onAddTodo,isSaving,
     todoList,onCompleteTodo,onUpdateTodo,isLoading,
     sortDirection,setSortDirection,
     sortField,setSortField,
     queryString,setQueryString 
    }
){
    
    return(
        <>
        <TodoForm onAddTodo={onAddTodo} isSaving={isSaving}/>
        <TodoList todoList={todoList} onCompleteTodo={onCompleteTodo} 
                  onUpdateTodo={onUpdateTodo} isLoading={isLoading}/>
       
        <hr />
        <TodosViewForm sortDirection={sortDirection} 
                      setSortDirection={setSortDirection} 
                      sortField={sortField} 
                      setSortField={setSortField}
                      queryString={queryString} 
                      setQueryString={setQueryString}/>

        </>
    )
}