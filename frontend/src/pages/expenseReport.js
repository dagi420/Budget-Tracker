import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { CSVLink } from 'react-csv';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseReport() {
  const [expenseData, setExpenseData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenseReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/report/expenses', {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate },
        });
        setExpenseData(response.data);
        const total = response.data.amounts.reduce((acc, amount) => acc + amount, 0);
        setTotalExpenses(total);
      } catch (error) {
        console.error('Error fetching expense report:', error);
      }
    };

    fetchExpenseReport();
  }, [startDate, endDate]);

  const handleExportCSV = () => {
    const csvData = expenseData.categories.map((category, index) => ({
      Category: category,
      Amount: expenseData.amounts[index],
    }));
    return csvData;
  };

  return (
    <div>
      <h2>Expense Report</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <h3>Total Expenses: ${totalExpenses}</h3>
      </div>
      {expenseData.categories && (
        <Pie
          data={{
            labels: expenseData.categories,
            datasets: [
              {
                label: 'Expenses',
                data: expenseData.amounts,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          }}
        />
      )}
      <div>
        <h3>Category-wise Breakdown</h3>
        <ul>
          {expenseData.categories && expenseData.categories.map((category, index) => (
            <li key={index}>
              {category}: ${expenseData.amounts[index]}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <CSVLink data={handleExportCSV()} filename="expense_report.csv">
          Export to CSV
        </CSVLink>
      </div>
    </div>
  );
}

export default ExpenseReport;