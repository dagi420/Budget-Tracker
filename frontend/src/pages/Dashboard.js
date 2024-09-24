import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [income, setIncome] = useState({ source: '', amount: '', category: '' });
  const [expense, setExpense] = useState({ item: '', amount: '', category: '' });
  const [budgets, setBudgets] = useState([]);
  const [budget, setBudget] = useState({ category: '', limit: '', period: 'monthly' });
  const [expenseData, setExpenseData] = useState({ categories: [], amounts: [] });
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [editingIncome, setEditingIncome] = useState({ id: '', source: '', amount: '', category: '' });
  const [isEditingExpense, setIsEditingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState({ id: '', item: '', amount: '', category: '' });
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState({ id: '', category: '', limit: '', period: 'monthly' });
  const navigate = useNavigate();

  
  const fetchOverview = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/overview', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOverview(response.data);
    } catch (error) {
      console.error('Error fetching overview:', error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/incomes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchBudgets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/budget', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  useEffect(() => {
    fetchOverview();
    fetchBudgets();
    fetchIncomes();
    fetchExpenses();
  }, []);
  
  useEffect(() => {
   

    const fetchExpenseReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/report/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenseData(response.data);
      } catch (error) {
        console.error('Error fetching expense report:', error);
      }
    };

    const fetchIncomes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/incomes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncomes(response.data);
      } catch (error) {
        console.error('Error fetching incomes:', error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchOverview();
    fetchBudgets();
    fetchExpenseReport();
    fetchIncomes();
    fetchExpenses();
  }, []);

  const handleIncomeChange = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleBudgetChange = (e) => {
    setBudget({ ...budget, [e.target.name]: e.target.value });
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/incomes', income, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIncome({ source: '', amount: '', category: '' });
      fetchOverview();
      fetchIncomes();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/expenses', expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpense({ item: '', amount: '', category: '' });
      fetchOverview();
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/budget', budget, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudget({ category: '', limit: '', period: 'monthly' });
      fetchBudgets();
    } catch (error) {
      console.error('Error adding budget:', error);
    }
  };

  const handleEditIncome = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/incomes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingIncome({ id, ...response.data });
      setEditingIncome(true);
    } catch (error) {
      console.error('Error fetching income details:', error);
    }
  };

  const handleUpdateIncome = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/incomes/${editingIncome.id}`, editingIncome, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingIncome({ id: '', source: '', amount: '', category: '' });
      setEditingIncome(false);
      fetchOverview();
      fetchIncomes();
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/incomes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOverview();
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  const handleEditExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingExpense({ id, ...response.data });
      setIsEditingExpense(true);
    } catch (error) {
      console.error('Error fetching expense details:', error);
    }
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/expenses/${editingExpense.id}`, editingExpense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingExpense({ id: '', item: '', amount: '', category: '' });
      setIsEditingExpense(false);
      fetchOverview();
      fetchExpenses();
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOverview();
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEditBudget = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/budget/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingBudget({ id, ...response.data });
      setIsEditingBudget(true);
    } catch (error) {
      console.error('Error fetching budget details:', error);
    }
  };

  const handleUpdateBudget = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/budget/${editingBudget.id}`, editingBudget, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingBudget({ id: '', category: '', limit: '', period: 'monthly' });
      setIsEditingBudget(false);
      fetchBudgets();
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/budget/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBudgets();
    } catch (error) {
      console.error('Error deleting budget:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleExportCSV = () => {
    const csvData = expenseData.categories.map((category, index) => ({
      Category: category,
      Amount: expenseData.amounts[index],
    }));
    return csvData;
  };

  return (
    <div>
      <h2>Welcome to Your Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h3>Budget Overview</h3>
        {overview ? (
          <div>
            <p>Income: ${overview.totalIncome}</p>
            <p>Expenses: ${overview.totalExpenses}</p>
            <p>Balance: ${overview.balance}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h3>Add Income</h3>
        <form onSubmit={handleAddIncome}>
          <div>
            <label>Source:</label>
            <input
              type="text"
              name="source"
              value={income.source}
              onChange={handleIncomeChange}
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={income.amount}
              onChange={handleIncomeChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={income.category}
              onChange={handleIncomeChange}
              required
            />
          </div>
          <button type="submit">Add Income</button>
        </form>
        <div>
          <h3>Manage Incomes</h3>
          <ul>
            {incomes.map((income) => (
              <li key={income._id}>
                {income.source}: ${income.amount} ({income.category})
                <button onClick={() => handleEditIncome(income._id)}>Edit</button>
                <button onClick={() => handleDeleteIncome(income._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Add Expense</h3>
        <form onSubmit={handleAddExpense}>
          <div>
            <label>Item:</label>
            <input
              type="text"
              name="item"
              value={expense.item}
              onChange={handleExpenseChange}
              required
            />
          </div>
          <div>
            <label>Amount:</label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleExpenseChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={expense.category}
              onChange={handleExpenseChange}
              required
            />
          </div>
          <button type="submit">Add Expense</button>
        </form>
        <div>
          <h3>Manage Expenses</h3>
          <ul>
            {expenses.map((expense) => (
              <li key={expense._id}>
                {expense.item}: ${expense.amount} ({expense.category})
                <button onClick={() => handleEditExpense(expense._id)}>Edit</button>
                <button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Manage Budgets</h3>
        <form onSubmit={handleAddBudget}>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={budget.category}
              onChange={handleBudgetChange}
              required
            />
          </div>
          <div>
            <label>Limit:</label>
            <input
              type="number"
              name="limit"
              value={budget.limit}
              onChange={handleBudgetChange}
              required
            />
          </div>
          <div>
            <label>Period:</label>
            <select name="period" value={budget.period} onChange={handleBudgetChange}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button type="submit">Add Budget</button>
        </form>
        <div>
          <h3>Existing Budgets</h3>
          <ul>
            {budgets.map((budget) => (
              <li key={budget._id}>
                {budget.category}: ${budget.limit} ({budget.period})
                <button onClick={() => handleEditBudget(budget._id)}>Edit</button>
                <button onClick={() => handleDeleteBudget(budget._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Expense Report</h3>
        {expenseData.categories.length > 0 && (
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
          <CSVLink data={handleExportCSV()} filename="expense_report.csv">
            Export to CSV
          </CSVLink>
        </div>
      </div>
      <div>
        <h3>Financial Health Report</h3>
        {overview && (
          <div>
            <p>Your current balance is ${overview.balance}. Here are some tips to improve your financial health:</p>
            <ul>
              {overview.balance < 0 && <li>Reduce unnecessary expenses to avoid debt.</li>}
              {overview.totalExpenses > overview.totalIncome * 0.5 && <li>Consider cutting down on discretionary spending.</li>}
              {overview.totalIncome > overview.totalExpenses * 2 && <li>Great job! Consider investing your surplus income.</li>}
              <li>Set a budget for each category and stick to it.</li>
              <li>Track your expenses regularly to identify areas where you can save.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;