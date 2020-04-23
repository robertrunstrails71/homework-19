import React from 'react';
import '../css/Component-style.css';

function Table( props ){

  const showUsers = props.showUsers;
 
  return (
        <>
          { showUsers.map( user => 
            <tr>
              <th scope="row">{user.id}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          )}
        </>
  );
};

export default Table;