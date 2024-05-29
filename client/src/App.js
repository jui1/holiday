import React, { useState } from 'react';

import EnquiryForm from "./component/EnquiryForm.jsx";

import Admin from './component/Admin';



function App() {
  const [isAdmin,setAdmin]=useState(false)
  return (
    <div className='App'>
      <button className='admin-btn' onClick={()=>setAdmin(true)}>Admin Login</button>
      <button className='user-btn' onClick={()=>setAdmin(false)}>Users Login</button>
{
  isAdmin?<Admin/>:<EnquiryForm/>
}
    </div>
    // <Router>
    //   <div className="App">
    //   <button className='admin-btn'>Admin Login</button>
    //     <Routes>
    //       <Route path="/" element={<EnquiryForm/>} />
    //       <Route path="/admin" element={<Admin/>} /> 
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
