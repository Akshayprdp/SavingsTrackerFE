import React, { useState, useEffect } from 'react';
import { addExpense, addincome, addsavings, getIncome, deleteIncome } from '../../../Services/UserApi'; // Adjust the path as per your file structure
import { AiOutlineDelete } from 'react-icons/ai'; // Import the delete icon

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [incomes, setIncomes] = useState([]); // Initialize incomes as an array
  const [expenses, setExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [newIncome, setNewIncome] = useState('');
  const [newSavingsGoal, setNewSavingsGoal] = useState('');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  // Fetch income data when the component mounts
  useEffect(() => {
    fetchIncome();
  }, []); 

  const fetchIncome = async () => {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    try {
      const response = await getIncome(userId);
      if (response && response.data) {
        const incomeEntries = response.data; // Assume response.data is an array of income entries
        setIncomes(incomeEntries); // Set incomes from response
        const totalIncome = incomeEntries.reduce((acc, curr) => acc + curr.amount, 0); // Calculate total income
        setIncome(totalIncome); // Update income state with total
      }
    } catch (error) {
      console.error('Error fetching income:', error);
    }
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(newIncome);
    if (isNaN(amount)) return;

    const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in localStorage
    const incomeData = {
      userId,
      amount,
    };

    try {
      const response = await addincome(incomeData);
      if (response.status === 200) {
        // Update income list and total income
        setIncomes((prevIncomes) => [...prevIncomes, { amount }]); // Add new income entry
        setIncome((prevIncome) => prevIncome + amount); // Update total income
        setNewIncome(''); // Clear input field
      } else {
        console.error('Failed to add income');
      }
    } catch (error) {
      console.error('Error adding income:', error);
    } finally {
      await fetchIncome(); // Refresh income data after adding
    }
  };

  const handleSavingsGoalSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(newSavingsGoal);
    if (isNaN(amount)) return;

    const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in localStorage
    const savingsData = {
      userId,
      goal: amount, // Assuming the API expects a key 'goal' for the savings amount
    };

    try {
      const response = await addsavings(savingsData);
      if (response.status === 200) {
        setSavingsGoal(amount);
        setNewSavingsGoal(''); // Clear input field
      } else {
        console.error('Failed to add savings goal');
      }
    } catch (error) {
      console.error('Error adding savings goal:', error);
    } finally {
      await fetchIncome(); // Refresh income data after adding
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount)) return;

    const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in localStorage
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

        // Reset form fields
        setExpenseDate('');
        setExpenseCategory('');
        setExpenseAmount('');
        setExpenseDescription('');
      } else {
        console.error('Failed to add expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    } finally {
      await fetchIncome(); // Refresh income data after adding
    }
  };

  const handleDeleteIncome = async (incomeId) => {
    const userId = localStorage.getItem('userId'); // Get userId from local storage
    try {
      const response = await deleteIncome(userId, incomeId); // Call API to delete income
      if (response.status === 200) {
        // Update income state after deletion
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== incomeId));
        fetchIncome(); // Refresh income data
      } else {
        console.error('Failed to delete income');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const currentSavings = income - expenses;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Financial Tracker</h1>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Income</h5>
              {incomes.map((income, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center">
                  <p className="card-text fs-2">${income.amount.toFixed(2)}</p>
                  <AiOutlineDelete
                    className="text-danger"
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => handleDeleteIncome(income.id)} // Pass the income ID for deletion
                  />
                </div>
              ))}
              {/* Conditionally render income input if total income is 0 */}
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
                    <button type="submit" className="btn btn-primary" style={{ width: '100px', height: '60px', backgroundColor: '#343333' }}>Add Income</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Expenses</h5>
              <p className="card-text fs-2">${expenses.toFixed(2)}</p>
              <button
                className="btn btn-sm btn-primary float-end"
                style={{ marginRight: '-15px', height: '60px', backgroundColor: '#343333' }}
                onClick={() => setShowExpenseModal(true)}
              >
                Add Expenses
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card" style={{ height: '210px' }}>
            <div className="card-body">
              <h5 className="card-title">Current Savings</h5>
              <p className="card-text fs-2">${currentSavings.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Savings Goal</h5>
              <p className="card-text fs-2">${savingsGoal.toFixed(2)}</p>
              <form onSubmit={handleSavingsGoalSubmit} className="mt-2">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    value={newSavingsGoal}
                    onChange={(e) => setNewSavingsGoal(e.target.value)}
                    placeholder="Enter goal amount"
                    style={{ height: '60px', marginTop: '20px' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100px', height: '60px', backgroundColor: '#343333' }}>Set Goal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Expenses modal can be implemented here */}
    </div>
  );
};

export default Dashboard;
