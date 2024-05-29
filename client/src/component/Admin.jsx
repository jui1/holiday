import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; 

function Admin() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('New'); 
  const [filterdata,setFilterdata]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:8000/api/enquiries')
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
         const filteredUsers = response.data.filter(user => user.status === filter);
        console.log(filteredUsers,'here is the list');
       setFilterdata(filteredUsers);
      })
      .catch(err => console.log(err));
      
  }, [filter]);

  const updateStatus=async(status,id)=>{
    const data={id,status};
    console.log(data,"datat to send");
    try {
      const response = await fetch('http://localhost:8000/api/updateEnquery', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('query updated suscesfully');
        data.status!==filter&&setFilterdata((prevdata)=>prevdata.filter((d)=>d._id!==data.id));
      } else {
        const errorData = await response.json();
        console.error('Failed to submit form:', errorData.message);
      }
    } catch (error) {
      console.error('Failed to submit form:', error.message);
    }
    finally{
      
    }
  }



  return (
    <div className="container">
      <div className="button-group">
        <h2 className='text'>Admin Console</h2>
        <button onClick={() => setFilter('New')}>New</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <div className="user-cards">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterdata?.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.message}</td>
                <td><button onClick={()=>updateStatus('pending',user._id)}>pending</button> 
                <button onClick={()=>updateStatus('completed',user._id)}>Completed</button>
                <button onClick={()=>updateStatus('delete',user._id)}>delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>  
    </div>
  );
}

export default Admin;