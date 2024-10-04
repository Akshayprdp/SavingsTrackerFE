import {userInstance} from "../Axios/Axiosinstance"


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

export const updateExpense = (userId, expenseId,updatedExpenseData) => {
  return userInstance.put(`/updateExpense/${userId}/${expenseId}`, updatedExpenseData);
};
// export const updateExpense = (updatedExpenseData) => {
//   return userInstance.put('/updateExpense', updatedExpenseData);
// };

export const deleteexpenses = (userId, expenseId) => {
  return userInstance.delete(`/removeExpense/${userId}/${expenseId}`);
};

export const addincome = (values) => {
  return userInstance.post('/addincome',{...values});
};
export const deleteIncome = (userId, incomeId) => {
  return userInstance.delete(`/removeincome/${userId}/${incomeId}`);
};

export const getIncome = (userId) => {
  return userInstance.get(`/income/${userId}`);
};

export const addsavings = (values) => {
  return userInstance.post('/addsaving',{...values});
};

export const getsavings = (userId) => {
  return userInstance.get(`/savings/${userId}`);
};

export const deleteSavingsGoal = (userId, savingsId) => {
  return userInstance.delete(`/removesavings/${userId}/${savingsId}`);
};

