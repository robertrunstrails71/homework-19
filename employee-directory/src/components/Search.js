import React, {useState, useEffect}  from 'react';
import '../css/Component-style.css';
import Table from './Table';

function Search() {
  const [ showUsers, setShowUsers ] = useState([]); 
  const [ allUsers, setAllUsers ] = useState([]);
  const [ searchInput, setSearchInput ] = useState("");
  
  useEffect(() => {
    getApiData();
  }, [])

  function handleInputChange( event ){
    const input = event.target.value;
    //console.log('[search input]', input)
    if( input.length > 0){
      //console.log(">>>> filtering")
      let filteredUsers = allUsers.filter( user=> 
        user.name.toLowerCase().indexOf(input) !== -1  ||
        user.username.toLowerCase().indexOf(input) !== -1 ||
        user.email.toLowerCase().indexOf(input) !== -1 ||
        user.phone.replace(/[-]/,"").indexOf(input) !== -1)
      //console.log("filteredUsers:", filteredUsers )
      setShowUsers([ ...filteredUsers] );
    } else {
      setShowUsers( allUsers )
    }
    setSearchInput( input );
  };

  async function getApiData(){
    const apiResult = await fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());
    console.log('API CALL >>> ', apiResult);
    setAllUsers( apiResult ) 
    setShowUsers( apiResult )
  };

  function handleSearch(){
    console.log('[SEARCH INPUT]', searchInput)
  };

  function sortUsersAsc(ev){
    ev.preventDefault();
    console.log("sorting users-asc")
    const sortedUsers = showUsers.sort(function(a,b){
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
        if(nameA < nameB )
          return -1
        if(nameA > nameB)
          return 1
      return 0
    });
    setShowUsers([ ...sortedUsers])
  };
  function sortUsersDsc(ev){
    ev.preventDefault();
    console.log("sorting users-dsc")
    const sortedUsers = showUsers.sort((a,b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
        if(nameA < nameB )
          return 1
        if(nameA > nameB)
          return -1
      return 0
    });
    setShowUsers([ ...sortedUsers])
  };
  
  return (
    <>
    <form>
      <div class="input-group">
          <input onChange={handleInputChange} value={searchInput} type="text" class="form-control form-control-lg" placeholder="Search for an employee"/>
          <div class="input-group-append">
              <button onClick={ ()=> {handleSearch()}} class="btn btn-outline-primary" type="button">Search</button>
          </div>
      </div>
      <br />
      <div class="sort">
      Sort:
      <button class="btn btn-sm btn-outline-primary" onClick={sortUsersAsc}><i class="fas fa-angle-up"></i></button>
      <button class="btn btn-sm btn-outline-primary" onClick={sortUsersDsc}><i class="fas fa-angle-down"></i></button>
      </div>
    </form> 
    <div class="table-wrapper">
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>
          <th scope="col">username</th>
          <th scope="col">Email</th>
          <th scope="col">Phone#</th>
        </tr>
      </thead>
      <tbody>
        <Table showUsers={showUsers} />
      </tbody>
    </table>
  </div>
   </>
  );
};

export default Search;