export default function TodosViewForm({
    sortDirection,setSortDirection,
    sortField,setSortField,
    queryString,setQueryString}){

    /*Function preventRefresh**/
    function preventRefresh(e){
        e.preventDefault();
    }
    
    return (
        <>
        <form onSubmit={preventRefresh}>
           <div>
             <label htmlFor="queryString">Search todos: </label>
             <input type="text" name="queryString" id="queryString" value={queryString} 
                       onChange ={(e) => setQueryString(e.target.value)} />
             <button type="button" name="clear" onClick={() => setQueryString('')}>Clear</button> 
          </div>  
          <div>
                <label htmlFor="SortBy">Sort by</label>
                <select name="SortBy" id="SortBy" value={sortField} onChange={(e) =>  setSortField(e.target.value)}>
                   <option value="title">Title</option>
                   <option value="createdTime">Time added</option>
                </select>
                <label htmlFor="Direction">Sort by</label>
                <select name="Direction" id="Direction" value={sortDirection} onChange={(e) =>  setSortDirection(e.target.value)} >
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
                </select>
           </div>
        </form>
        </>
    )
};