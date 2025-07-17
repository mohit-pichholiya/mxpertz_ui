import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookAppointment.css';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [appointment, setAppointment] = useState({
    doctor: '',
    patient: '',
    date: '',
    reason: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctorsAndPatients = async () => {
      try {
        const [doctorRes, patientRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/doctors'),
          axios.get('http://localhost:5000/api/auth/patients'),
        ]);
        setDoctors(doctorRes.data);
        setPatients(patientRes.data);
      } catch (err) {
        console.error('Failed to fetch doctors or patients');
      }
    };
    fetchDoctorsAndPatients();
  }, []);

  const handleChange = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/appointments/book', appointment, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Appointment booked successfully!');
      setAppointment({ doctor: '', patient: '', date: '', reason: '' });
    } catch (err) {
      console.error('Booking error:', err);
      alert('Booking failed. Please check your input and try again.');
    }
  };

  return (
    <div className="book-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="book-form">

        {/* Patient dropdown */}
        <label>Select Patient</label>
        <select name="patient" onChange={handleChange} value={appointment.patient} required>
          <option value="">-- Choose a Patient --</option>
          {patients.map((pat) => (
            <option key={pat._id} value={pat._id}>
              {pat.name} 
            </option>
          ))}
        </select>
        <button type="button" onClick={() => navigate('/register-patient/doctor')}>
          + Add New Patient
        </button>

        {/* Doctor dropdown */}
        <label>Select Doctor</label>
        <select name="doctor" onChange={handleChange} value={appointment.doctor} required>
          <option value="">-- Choose a Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} 
            </option>
          ))}
        </select>
        <button type="button" onClick={() => navigate('/register-patient/doctor')}>
          + Add New Doctor
        </button>

        {/* Appointment time and reason */}
        <label>Appointment Date & Time</label>
        <input
          name="date"
          type="datetime-local"
          value={appointment.date}
          onChange={handleChange}
          required
        />

        <label>Reason for Visit</label>
        <textarea
          name="reason"
          placeholder="Describe your concern"
          value={appointment.reason}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
