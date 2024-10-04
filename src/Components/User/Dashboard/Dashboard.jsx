import React, { useState, useEffect } from 'react';
import { addExpense, addincome, addsavings, getIncome, deleteIncome, getsavings, deleteSavingsGoal, getExpenses } from '../../../Services/UserApi'; // Adjust the path as per your file structure
import { AiOutlineDelete } from 'react-icons/ai'; // Import the delete icon
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css'

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState([]);
  const [newIncome, setNewIncome] = useState('');
  const [newSavingsGoal, setNewSavingsGoal] = useState('');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    fetchIncome();
    fetchSavingsGoal();
    fetchExpenses();
  }, []);

  const fetchIncome = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getIncome(userId);
      if (response && response.data) {
        const incomeEntries = response.data;
        setIncomes(incomeEntries);
        const totalIncome = incomeEntries.reduce((acc, curr) => acc + curr.amount, 0);
        setIncome(totalIncome);
      }
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  const fetchSavingsGoal = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getsavings(userId);
      if (response && response.data) {
        setSavings(response.data);
      }
    } catch (error) {
      console.error('Error fetching savings goals:', error);
    }
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(newIncome);
    if (isNaN(amount)) return;

    const userId = localStorage.getItem('userId');
    const incomeData = {
      userId,
      amount,
    };

    try {
      const response = await addincome(incomeData);
      if (response.status === 200) {
        setIncomes((prevIncomes) => [...prevIncomes, { amount }]);
        setIncome((prevIncome) => prevIncome + amount);
        setNewIncome('');
      } else {
        console.error('Failed to add income');
      }
    } catch (error) {
      console.error('Error adding income:', error);
    } finally {
      await fetchIncome();
    }
  };

  const handleSavingsGoalSubmit = async (e) => {
    e.preventDefault();
    const save = parseFloat(newSavingsGoal);
    if (isNaN(save)) return;

    const userId = localStorage.getItem('userId');
    const savingsData = {
      userId,
      goal: save,
    };

    try {
      const response = await addsavings(savingsData);
      if (response.status === 200) {
        setSavings((prevSavings) => [...prevSavings, { goal: save }]);
        setNewSavingsGoal('');
      } else {
        console.error('Failed to add savings goal');
      }
    } catch (error) {
      console.error('Error adding savings goal:', error);
    } finally {
      await fetchSavingsGoal();
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount)) return;

    const userId = localStorage.getItem('userId');
    const expenseData = {
      userId,
      expenses: [
        {
          date: expenseDate,
          category: expenseCategory,
          amount,
          description: expenseDescription,
        },
      ],
    };

    try {
      const response = await addExpense(expenseData);
      if (response.status === 200) {
        setExpenses((prevExpenses) => prevExpenses + amount);
        setShowExpenseModal(false);
        setExpenseDate('');
        setExpenseCategory('');
        setExpenseAmount('');
        setExpenseDescription('');
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await deleteIncome(userId, incomeId);
      if (response.status === 200) {
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income._id !== incomeId));
        setIncome((prevIncome) => prevIncome - incomes.find((income) => income._id === incomeId).amount);
      } else {
        console.error('Failed to delete income');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleDeleteSavingsGoal = async (savingsId) => {
    if (!savingsId) {
      console.error('Invalid savingsId');
      return;
    }
    const userId = localStorage.getItem('userId');
    try {
      const response = await deleteSavingsGoal(userId, savingsId);
      if (response.status === 200) {
        setSavings((prevSavings) => prevSavings.filter((savings) => savings._id !== savingsId));
      } else {
        console.error('Failed to delete savings goal');
      }
    } catch (error) {
      console.error('Error deleting savings goal:', error);
    }
  };

  const fetchExpenses = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getExpenses(userId);
      if (response && response.data && response.data.expenses) {
        const totalExpenses = response.data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        setExpenses(totalExpenses);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const currentSavings = income - expenses;
  
  useEffect(() => {
    if (savings.length > 0 && !hasShownToast) {
      const savingsGoal = savings[0].goal;
      if (currentSavings < savingsGoal) {
        toast.error(`You are short of your savings goal by $${(savingsGoal - currentSavings).toFixed(2)}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setHasShownToast(true); // Mark the toast as shown
      }
    }
  }, [currentSavings, savings, hasShownToast]);

  return (
    <div className="container mt-5 ">
      <div className="container mt-4 w-100 h-25 p-3  rounded" style={{backgroundColor:'#e4e4e6'}}>
        <h1 className="mb-4">Financial Tracker</h1>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card">
              <div className="card-body" style={{ height: '180px' }}>
                <h5 className="card-title">Income</h5>
                {incomes.map((income, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center">
                    <p className="card-text fs-2">${income.amount.toFixed(2)}</p>
                    <AiOutlineDelete
                      className="text-danger"
                      style={{ cursor: 'pointer', marginLeft: '10px' }}
                      onClick={() => handleDeleteIncome(income._id)}
                    />
                  </div>
                ))}
                {income <= 0 && (
                  <form onSubmit={handleIncomeSubmit} className="mt-2">
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={newIncome}
                        onChange={(e) => setNewIncome(e.target.value)}
                        placeholder="Enter amount"
                        style={{ height: '60px', marginTop: '20px' }}
                      />
                      <div className='align-left'>
                        <button type="submit" className="btn btn-primary" style={{ width: '100px', height: '60px', backgroundColor: '#343333' ,marginLeft:'0px',marginTop:'20px'}}>Add Income</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body"style={{height:'180px'}}>
                <h5 className="card-title">Expenses</h5>
                <p className="card-text fs-2">${expenses.toFixed(2)}</p>
                <button className="btn btn-primary" style={{marginLeft:'25px',backgroundColor:'#343333',width:'200px'}} onClick={() => setShowExpenseModal(true)}>Add Expense</button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body"style={{height:'180px'}}>
                <h5 className="card-title">Current Savings</h5>
                <p className="card-text fs-2">${currentSavings.toFixed(2)}</p>
                {savings.length > 0 && currentSavings < savings[0].goal && (
                  <p className="text-danger savings-warning">
                    You are short of your savings goal by ${(savings[0].goal - currentSavings).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-body" style={{height:'180px'}}>
                <h5 className="card-title">Savings Goals</h5>
                {savings && savings.length > 0 ? (
                  savings.map((goal) => (
                    <div key={goal._id} className="d-flex justify-content-between align-items-center mb-2">
                      <p className="card-text fs-2">${goal.goal}</p>
                      <AiOutlineDelete
                        className="text-danger"
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        onClick={() => handleDeleteSavingsGoal(goal._id)}
                      />
                    </div>
                  ))
                ) : (
                  <form onSubmit={handleSavingsGoalSubmit} className="mt-2">
                    <div className="input-group" style={{height:'140px'}}>
                      <input
                        type="number"
                        className="form-control"
                        value={newSavingsGoal}
                        onChange={(e) => setNewSavingsGoal(e.target.value)}
                        placeholder="Set a savings goal"
                        style={{ height: '60px', marginTop: '20px' }}
                      />
                      <button type="submit" className="btn btn-primary" style={{ width: '100px', height: '60px', backgroundColor: '#343333',marginTop:'20px' }}>Set Goal</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExpenseModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Expense</h5>
                <button type="button" className="btn-close" onClick={() => setShowExpenseModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleExpenseSubmit}>
                  <div className="mb-3">
                    <label htmlFor="expenseDate" className="form-label" style={{color:'black'}}>Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="expenseDate"
                      value={expenseDate}
                      onChange={(e) => setExpenseDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expenseCategory" className="form-label" style={{color:'black'}}>Category</label>
                    <input
                      type="text"
                      className="form-control"
                      id="expenseCategory"
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expenseAmount" className="form-label" style={{color:'black'}}>Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="expenseAmount"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="expenseDescription" className="form-label" style={{color:'black'}}>Description</label>
                    <textarea
                      className="form-control"
                      id="expenseDescription"
                      value={expenseDescription}
                      onChange={(e) => setExpenseDescription(e.target.value)}
                    />
                  </div>
                  <div className='res'>
                    <div className="d-flex justify-content-center">
                      <button type="submit"  className="btn btn-primary" style={{backgroundColor:'#343333',marginLeft:'10px'}}>Add Expense</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Dashboard;