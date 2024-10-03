import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing edit and delete icons
import { getExpenses,deleteexpenses } from '../../../Services/UserApi'; // Adjust the import path for your API functions

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const userId = localStorage.getItem('userId'); // Get userId from local storage

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses(userId); // Assuming getExpenses fetches data using Axios
        
        // Log the full response to inspect
        console.log('API response:', response);
        
        // Use response.data to access the actual payload
        if (response.data && response.data.success) {
          setExpenses(response.data.expenses); // Set expenses correctly
        } else {
          console.error('Failed to fetch expenses:', response.data); // Log response in case of failure
        }
      } catch (error) {
        console.error('Error fetching expenses:', error); // Log the error from the catch block
      }
    };
  
    fetchExpenses();
  }, [userId]);
  

  const handleEdit = (expense) => {
    console.log('Edit expense:', expense); // Edit logic placeholder
  };

  const handleDelete = async (expenseId) => {
    const userId = localStorage.getItem('userId'); // Fetch userId from localStorage
    try {
      await deleteexpenses(userId, expenseId); // Call deleteexpenses with userId and expenseId
      setExpenses(expenses.filter(expense => expense._id !== expenseId)); // Update the state to remove the deleted expense
    } catch (error) {
      console.error('Error deleting expense:', error);
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
                <th style={{ padding: '8px 5px' }}>No</th>
                <th style={{ padding: '8px 5px' }}>Date</th>
                <th style={{ padding: '8px 5px' }}>Category</th>
                <th style={{ padding: '8px 5px' }}>Amount</th>
                <th style={{ padding: '8px 5px' }}>Description</th>
                <th style={{ padding: '8px 5px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <tr key={expense._id}>
                    <td>{index + 1}</td> {/* Row number */}
                    <td>{new Date(expense.date).toLocaleDateString()}</td> {/* Formatted date */}
                    <td>{expense.category}</td> {/* Category */}
                    <td>${expense.amount.toFixed(2)}</td> {/* Formatted amount */}
                    <td>{expense.description}</td> {/* Description */}
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
    </div>
  );
};

export default Expenses;
