import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; 
import { getExpenses, getIncome } from "../../../Services/UserApi"; 
import "./Chart.css";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Income", "Savings", "Expenses"],
    datasets: [
      {
        label: "Financial Overview",
        data: [0, 0, 0], // Placeholder values for Income, Savings, and Expenses
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)", // Blue for Income
          "rgba(250, 192, 19, 0.8)", // Yellow for Savings
          "rgba(255, 0, 0, 0.8)",   // Red for Expenses
        ],
        borderColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(255, 0, 0, 0.8)",
        ],
      },
    ],
  });

  const [expenses, setExpenses] = useState(0);
  const [income, setIncome] = useState(0);

  // Function to fetch expenses
  const fetchExpenses = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await getExpenses(userId);
      if (response && response.data && response.data.expenses) {
        const totalExpenses = response.data.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        setExpenses(totalExpenses);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  // Function to fetch income
  const fetchIncome = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await getIncome(userId);
      if (response && response.data) {
        const incomeData = response.data; // Assuming the API returns the array of income objects
        if (incomeData.length > 0) {
          setIncome(incomeData[0].amount); // Assuming there is at least one income entry
        }
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Fetch expenses and income when the component mounts
  useEffect(() => {
    fetchExpenses();
    fetchIncome();
  }, []);

  // Update chart data when income or expenses change
  useEffect(() => {
    const savings = income - expenses; // Calculate savings as income - expenses

    setChartData({
      labels: ["Income", "Savings", "Expenses"],
      datasets: [
        {
          label: "Financial Overview",
          data: [income, savings, expenses], // Use calculated savings
          backgroundColor: [
            "rgba(43, 63, 229, 0.8)", // Blue for Income
            "rgba(0, 255, 0, 0.8)", // Yellow for Savings
            "rgba(255, 0, 0, 0.8)",   // Red for Expenses
          ],
          borderColor: [
            "rgba(43, 63, 229, 0.8)",
            "rgba(0, 255, 0, 0.8)",
            "rgba(255, 0, 0, 0.8)",
          ],
        },
      ],
    });
  }, [income, expenses]);

  return (
    <div style={{ marginTop: '100px' }}>
      <p><b style={{marginLeft:'610px'}}>Income vs Expense</b></p>
      <div className="dataCard categoryCard">
        
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              title: {
                text: "Financial Overview",
                display: true,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
