{/*TodoForm component*/}
function TodoForm(){
    return(
        <form>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle"/>
            <input type="submit" value="Add Todo" />
        </form>
    )
}
export default TodoForm;