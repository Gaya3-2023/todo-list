import {useState,useEffect} from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
          padding:10px;
          > div{ padding :10px 0;}
          `; 

export default function TodosViewForm({
    sortDirection,setSortDirection,
    sortField,setSortField,
    queryString,setQueryString}){

    const [localQueryString,setLocalQueryString] = useState(queryString);

    useEffect(() => {
        const debounce = setTimeout(() => {setQueryString(localQueryString)},500);
         // Cleanup function to clear the timeout 
        return () => {clearTimeout(debounce)};     
    },[localQueryString,setQueryString]);   //end of useEffect
   

    /*Function preventRefresh**/
    function preventRefresh(e){
        e.preventDefault();
    }
    
    return (
        <>
        <StyledForm onSubmit={preventRefresh}>
           <div>
             <label htmlFor="queryString">Search todos: </label>
             <input type="text" name="queryString" id="queryString" value={localQueryString} 
                       onChange ={(e) => setLocalQueryString(e.target.value)} />
             <button type="button" name="clear" onClick={() => setLocalQueryString('')}>Clear</button> 
          </div>  
          <div>
                <label htmlFor="SortBy">Sort by</label>
                <select name="SortBy" id="SortBy" value={sortField} onChange={(e) =>  setSortField(e.target.value)}>
                   <option value="title">Title</option>
                   <option value="createdTime">Time added</option>
                </select>
                <label htmlFor="Direction">Direction</label>
                <select name="Direction" id="Direction" value={sortDirection} onChange={(e) =>  setSortDirection(e.target.value)} >
                   <option value="asc">Ascending</option>
                   <option value="desc">Descending</option>
                </select>
           </div>
        </StyledForm>
        </>
    )
};