// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';
import './App.css';
import PatientaurdoctorRegister from './components/Patient_doctor_register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/appointments" element={<MyAppointments />} />
         <Route path="/register-patient/doctor" element={<PatientaurdoctorRegister />} />

        
      </Routes>
    </Router>
  );
}

export default App;
