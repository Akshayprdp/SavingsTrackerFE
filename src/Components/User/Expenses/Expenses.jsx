import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing edit and delete icons
import { getExpenses, deleteexpenses, updateExpense } from '../../../Services/UserApi'; // Adjust the import path for your API functions

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [showExpenseModal, setShowExpenseModal] = useState(false); // Modal visibility state
  const [selectedExpense, setSelectedExpense] = useState(null); // Selected expense for editing
  const [expenseDate, setExpenseDate] = useState(''); // Form state for date
  const [expenseCategory, setExpenseCategory] = useState(''); // Form state for category
  const [expenseAmount, setExpenseAmount] = useState(''); // Form state for amount
  const [expenseDescription, setExpenseDescription] = useState(''); // Form state for description

  const userId = localStorage.getItem('userId'); // Get userId from local storage

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses(userId); // Assuming getExpenses fetches data using Axios
        if (response.data && response.data.success) {
          setExpenses(response.data.expenses); // Set expenses correctly
        } else {
          console.error('Failed to fetch expenses:', response.data);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [userId]);

  const handleEdit = (expense) => {
    setSelectedExpense(expense); // Set the expense to be edited
    setExpenseDate(new Date(expense.date).toISOString().split('T')[0]); // Pre-fill the date input
    setExpenseCategory(expense.category); // Pre-fill the category input
    setExpenseAmount(expense.amount); // Pre-fill the amount input
    setExpenseDescription(expense.description); // Pre-fill the description input
    setShowExpenseModal(true); // Show the modal
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteexpenses(userId, expenseId); // Call deleteexpenses with userId and expenseId
      setExpenses(expenses.filter(expense => expense._id !== expenseId)); // Update the state to remove the deleted expense
    } catch (error) {
      console.error('Error deleting expense:', error);
     
    }
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    if (selectedExpense) {
      const updatedExpenseData = {
        expenseId: selectedExpense._id, // Ensure you include the expenseId
        expenseDate,
        expenseCategory,
        expenseAmount,
        expenseDescription,
      };
      try {
        // Call the updateExpense API function
        const response = await updateExpense(updatedExpenseData); // Send the complete data
        if (response.data && response.data.status) { // Adjusted to check for status instead of success
          // Update the state with the updated expense
          setExpenses(expenses.map(exp => (exp._id === selectedExpense._id ? response.data.updatedExpense : exp)));
          setShowExpenseModal(false); // Close the modal
        } else {
          console.error('Failed to update expense:', response.data);
        }
      } catch (error) {
        console.error('Error updating expense:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Your Expenses</h1>
      <div className="mt-4">
        <h2 className="mb-4 text-center" style={{ color: '#333' }}>Expenses List</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <tr key={expense._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.category}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.description}</td>
                    <td>
                      <FaEdit
                        style={{ cursor: 'pointer', color: '#007bff', marginRight: '10px' }}
                        onClick={() => handleEdit(expense)} // Edit functionality
                      />
                      <FaTrash
                        style={{ cursor: 'pointer', color: '#dc3545' }}
                        onClick={() => handleDelete(expense._id)} // Delete functionality
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No expenses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Editing Expense */}
      <div className={`modal ${showExpenseModal ? 'd-block' : ''}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Expense</h5>
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
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#343333', marginLeft: '70px' }}>Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
