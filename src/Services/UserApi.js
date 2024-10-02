import {userInstance,Hostedapiinstance} from "../Axios/Axiosinstance"
import axios from 'axios';

export const userRegister=(values)=>{
    return userInstance.post("/signup",{...values})
}

export const userLogin = (values) => {
    return userInstance.post("/login", { ...values });
};

  export const updateProfile = (userInfo) => {
      return userInstance.put('/updateProfile', userInfo); 
  };

  export const addExpense = (values) => {
    return userInstance.post('/addExpense',{...values}); 
};

export const getExpenses = (userId) => {
  return userInstance.get(`/getExpenses/${userId}`);
};

export const addincome = (values) => {
  return userInstance.post('/addincome',{...values});
};

export const addsavings = (values) => {
  return userInstance.post('/addsaving',{...values});
};

