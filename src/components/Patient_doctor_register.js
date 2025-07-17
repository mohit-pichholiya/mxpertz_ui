// I had did registration of patient,doctor , staff in one api so thats why it asks password

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const PatientaurdoctorRegister = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigate('/book');
    } catch (err) {
      alert('Registration failed.');
    }
  };

 

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>Add a new patient/doctor</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <select name="role" onChange={handleChange}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button type="submit">Add details</button>
        </form>
        </div>
    </div>
  );
};


// I had did registration of patient,doctor , staff in one api so thats why it asks password


export default PatientaurdoctorRegister;
