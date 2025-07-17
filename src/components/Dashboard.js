


// ✅ src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to Hospital Appointment System</h1>
      <div className="dashboard-links">
        <Link to="/book">Book Appointment</Link>
        <Link to="/appointments">All Appointments</Link>
      </div>
    </div>
  );
};

export default Dashboard;
