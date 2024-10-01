import React from 'react'
import Header from '../../Components/User/Header/Header'
import Home from '../../Components/User/Home/Home'
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../../Components/User/Dashboard/Dashboard';


function Homepage() {
  return (
    <div>
      <Header/>
      {/* <Home/> */}
      <Dashboard/>
    
     
    </div>
  )
}

export default Homepage
