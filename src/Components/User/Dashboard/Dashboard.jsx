import React, { useState } from 'react';

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [newIncome, setNewIncome] = useState('');
  const [newSavingsGoal, setNewSavingsGoal] = useState('');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(newIncome);
    if (isNaN(amount)) return;
    setIncome(income + amount);
    setNewIncome('');
  };

  const handleSavingsGoalSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(newSavingsGoal);
    if (isNaN(amount)) return;
    setSavingsGoal(amount);
    setNewSavingsGoal('');
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmount);
    if (isNaN(amount)) return;
    setExpenses(expenses + amount);
    setShowExpenseModal(false);
    // Reset form fields
    setExpenseDate('');
    setExpenseCategory('');
    setExpenseAmount('');
    setExpenseDescription('');
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
                    style={{height:'60px',marginTop:'20px'}}
                  />
                  <button type="submit" className="btn btn-primary" style={{width:'100px',height:'60px'}}>Add Income</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Expenses
              </h5>
              <p className="card-text fs-2">${expenses.toFixed(2)}</p>
              <button 
                  className="btn btn-sm btn-primary float-end"  
                  style={{ marginRight: '40px', width: '200px' }}
                   onClick={() => setShowExpenseModal(true)}
                >
                  +
                </button>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Current Savings</h5>
              <p className="card-text fs-2">${currentSavings.toFixed(2)}</p>
              <small className="text-muted">Read-only (Income - Expenses)</small>
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
                    style={{height:'60px',marginTop:'20px'}}
                  />
                  <button type="submit" className="btn btn-primary" style={{width:'100px',height:'60px'}}>Set Goal</button>
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
                  <label htmlFor="expenseCategory" className="form-label"style={{ color: 'black' }}>Category</label>
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
                  <label htmlFor="expenseAmount" className="form-label"style={{ color: 'black' }}>Amount</label>
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
                  <label htmlFor="expenseDescription" className="form-label"style={{ color: 'black' }}>Description</label>
                  <textarea
                    className="form-control"
                    id="expenseDescription"
                    value={expenseDescription}
                    onChange={(e) => setExpenseDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginLeft: '90px', width: '300px' }} >Add Expense</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showExpenseModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Dashboard;