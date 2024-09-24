// src/pages/HomePage.js

import React from 'react';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Budget Tracker</h1>
      <p style={styles.text}>
        Manage your finances with ease. Track your income, expenses, and savings all in one place.
      </p>
      <a href="/register" style={styles.button}>Get Started</a>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '3em',
    color: '#333',
  },
  text: {
    fontSize: '1.2em',
    color: '#666',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    marginTop: '20px',
    display: 'inline-block',
  },
};

export default HomePage;
