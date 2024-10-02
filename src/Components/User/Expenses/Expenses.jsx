// Expenses.js

import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing edit and delete icons
import { getExpenses } from '../../../Services/UserApi'; // Adjust the import path for your API functions

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const userId = localStorage.getItem('userId'); // Get userId from local storage

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await getExpenses(userId); // Use the getExpenses API function

        // Check if the response is successful and has expenses
        if (response && response.success) {
          setExpenses(response.expenses); // Set the expenses from the response
        } else {
          console.error('Failed to fetch expenses:', response);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [userId]);

  const handleEdit = (expense) => {
    // Implement the logic for editing an expense
    console.log('Edit expense:', expense);
  };

  const handleDelete = async (expenseId) => {
    // Uncomment the delete logic here if you have a delete endpoint set up
    // try {
    //   await userInstance.delete(`/deleteExpense/${expenseId}`);
    //   setExpenses(expenses.filter(expense => expense._id !== expenseId)); // Update state to remove the deleted expense
    // } catch (error) {
    //   console.error('Error deleting expense:', error);
    // }
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
                    <td>{index + 1}</td> {/* Use index for No column */}
                    <td>{new Date(expense.date).toLocaleDateString()}</td> {/* Format the date */}
                    <td>{expense.category}</td>
                    <td>${expense.amount.toFixed(2)}</td>
                    <td>{expense.description}</td>
                    <td>
                      <FaEdit
                        style={{ cursor: 'pointer', color: '#007bff', marginRight: '10px' }}
                        onClick={() => handleEdit(expense)}
                      />
                      <FaTrash
                        style={{ cursor: 'pointer', color: '#dc3545' }}
                        onClick={() => handleDelete(expense._id)} // Use expense._id for deletion
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
