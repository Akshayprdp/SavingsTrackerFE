import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Loginpage from '../Pages/User/Loginpage';
import Registrationpage from '../Pages/User/Registrationpage';
import Homepage from '../Pages/User/Homepage';
import Profilepage from '../Pages/User/Profilepage';
import ProtectedRoute from '../Components/User/ProtectedRoute/ProtectedRoute';
import Expensespage from '../Pages/User/Expensespage';

function Userrouter() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Loginpage />} />
        <Route path='/signup' element={<Registrationpage />} /> 
        {/* <Route path='/'  element ={<ProtectedRoute element ={<Homepage/>}/>} /> */}
        <Route path='/'  element ={<Homepage/>}/>
        <Route path='/profile' element ={<ProtectedRoute element={<Profilepage/>}/>} />
        {/* <Route path='/expenses' element ={<ProtectedRoute element={<Expensespage/>}/>} /> */}
        <Route path='/expenses'  element={<Expensespage/>}/>

      <Route path='*' element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default Userrouter;
