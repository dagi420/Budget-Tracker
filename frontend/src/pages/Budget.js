// src/pages/Budget.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [period, setPeriod] = useState('monthly');

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:5000/api/budget', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgets(result.data);
    };
    fetchBudgets();
  }, []);

  const handleAddBudget = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newBudget = { category, limit, period };
    const result = await axios.post('http://localhost:5000/api/budget/add', newBudget, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBudgets([...budgets, result.data]);
  };

  return (
    <div>
      <h2>Manage Budgets</h2>
      <form onSubmit={handleAddBudget}>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Limit:</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Period:</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Budget;