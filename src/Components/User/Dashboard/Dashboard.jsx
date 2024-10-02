import React, { useState } from 'react';
import { addExpense, addincome, addsavings } from '../../../Services/UserApi'; // Adjust the path as per your file structure

const Dashboard = () => {
  const [income, setIncome] = useState(0); // Initialize income to 0
  const [expenses, setExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [newIncome, setNewIncome] = useState('');
  const [newSavingsGoal, setNewSavingsGoal] = useState('');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(newIncome);
    if (isNaN(amount)) return;

    // Get userId from local storage
    const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in localStorage

    // Prepare the income data
    const incomeData = {
      userId,
      amount,
    };

    try {
      // Call the API to add income
      const response = await addincome(incomeData);
      if (response.status === 200) {
        // Successfully added income, update UI
        setIncome(income + amount);
        setNewIncome(''); // Clear input field
      } else {
        console.error('Failed to add income');
      }
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleSavingsGoalSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(newSavingsGoal);
    if (isNaN(amount)) return;

    // Get userId from local storage
    const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in localStorage

    // Prepare the savings goal data
    const savingsData = {
      userId,
      goal: amount, // Assuming the API expects a key 'goal' for the savings amount
    };

    try {
      // Call the API to add savings goal
      const response = await addsavings(savingsData);
      if (response.status === 200) {
        // Successfully added savings goal, update UI
        setSavingsGoal(amount);
        setNewSavingsGoal(''); // Clear input field
      } else {
        console.error('Failed to add savings goal');
      }
    } catch (error) {
      console.error('Error adding savings goal:', error);
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount)) return;

    // Get userId from local storage
    const userId = localStorage.getItem('userId'); // Ensure 'userId' is stored in localStorage

    // Prepare the expense data
    const expenseData = {
      userId,
      expenses: [
        {
          date: expenseDate,
          category: expenseCategory,
          amount: expenseAmount,
          description: expenseDescription,
        },
      ],
    };

    try {
      // Call the API to add expense
      const response = await addExpense(expenseData);
      if (response.status === 200) {
        // Successfully added expense, update UI
        setExpenses(expenses + amount);
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
              <p className="card-text fs-2">${income.toFixed(2)}</p>
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
                    placeholder="Set goal"
                    style={{ height: '60px', marginTop: '20px' }}
                  />
                  <button type="submit" className="btn btn-primary" style={{ width: '100px', height: '60px', backgroundColor: '#343333' }}>Set Goal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Modal */}
      <div className={`modal ${showExpenseModal ? 'd-block' : ''}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Expense</h5>
              <button type="button" className="btn-close" onClick={() => setShowExpenseModal(false)}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleExpenseSubmit}>
                <div className="mb-3">
                  <label htmlFor="expenseDate" className="form-label" style={{ color: 'black' }}>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="expenseDate"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expenseCategory" className="form-label" style={{ color: 'black' }}>Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expenseCategory"
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expenseAmount" className="form-label" style={{ color: 'black' }}>Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="expenseAmount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expenseDescription" className="form-label" style={{ color: 'black' }}>Description</label>
                  <textarea
                    className="form-control"
                    id="expenseDescription"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343333' }}>Add Expense</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showExpenseModal && <div className="modal-backdrop fade show" onClick={() => setShowExpenseModal(false)}></div>}
    </div>
  );
};

export default Dashboard;
