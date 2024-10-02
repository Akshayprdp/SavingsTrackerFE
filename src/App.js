
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Userrouter from './Route/Userrouter';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <div>
    
    <BrowserRouter>
    <Routes>
      <Route path='/*'element={<Userrouter/>}/>
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  
    
    </div>
  );
}

export default App;
