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

  // Fetch expenses
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

  // Fetch income
  const fetchIncome = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await getIncome(userId);
      if (response && response.data) {
        const incomeData = response.data; 
        if (incomeData.length > 0) {
          setIncome(incomeData[0].amount); 
        }
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchExpenses();
    fetchIncome();
  }, []);

  // Update chart when income or expenses change
  useEffect(() => {
    const savings = income - expenses; 

    setChartData({
      labels: ["Income", "Savings", "Expenses"],
      datasets: [
        {
          label: "Financial Overview",
          data: [income, savings, expenses],
          backgroundColor: [
            "rgba(43, 63, 229, 0.8)", // Blue for Income
            "rgba(0, 255, 0, 0.8)",   // Green for Savings
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
    <div className="container mt-4 h-25 p-3  rounded d-flex flex-column justify-content-center align-items-center gap-3 ms-md-14 " style={{backgroundColor:'#e4e4e6'}}>
      <p className="chartTitle"><b>Income vs Expense</b></p>
      <div className="dataCard categoryCard">
        <Doughnut className="dougnut"
          data={chartData}
          options={{
            plugins: {
              title: {
                text: "Financial Overview",
                display: true,
              },
            },
            responsive: true,
            // maintainAspectRatio: false,
          }}
         />
      </div>
    </div>
  );
};

export default Chart;
