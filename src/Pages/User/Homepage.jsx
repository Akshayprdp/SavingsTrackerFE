import React from 'react'
import Header from '../../Components/User/Header/Header'

import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../../Components/User/Dashboard/Dashboard';
import Chart from '../../Components/User/Chart/Chart';


function Homepage() {
  return (
    <div>
      <Header/>
     
      <Dashboard/>
      <Chart/>
    
     
    </div>
  )
}

export default Homepage
