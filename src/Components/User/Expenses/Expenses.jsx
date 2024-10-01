import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing edit and delete icons

const ExpensesTable = ({ expenses = [], onEdit, onDelete }) => {
  // Default expenses data if none is passed
  const dummyExpenses = [
    { id: 1, date: '2024-10-01', category: 'Food', amount: 50.0, description: 'Lunch' },
    { id: 2, date: '2024-10-02', category: 'Transport', amount: 20.5, description: 'Bus fare' },
    { id: 3, date: '2024-10-03', category: 'Entertainment', amount: 100.0, description: 'Movie tickets' }
  ];

  const expenseData = expenses.length > 0 ? expenses : dummyExpenses;

  return (
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
              <th style={{ padding: '8px 5px' }}>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.description}</td>
                <td>
                  {/* Edit and Delete Icons */}
                  <FaEdit
                    style={{ cursor: 'pointer', color: '#007bff', marginRight: '10px' }}
                    onClick={() => onEdit(expense)} // Trigger onEdit callback when clicked
                  />
                  <FaTrash
                    style={{ cursor: 'pointer', color: '#dc3545' }}
                    onClick={() => onDelete(expense.id)} // Trigger onDelete callback when clicked
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpensesTable;
