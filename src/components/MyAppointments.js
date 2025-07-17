import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyAppointments.css';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (Array.isArray(res.data)) {
          const plainAppointments = res.data.map((appt) => ({
            _id: appt._id,
            doctor: typeof appt.doctor === 'object' ? appt.doctor.name : appt.doctor,
            date: appt.date,
            status: appt.status
          }));
          setAppointments(plainAppointments);
        } else {
          alert('Invalid response format');
        }
      } catch (err) {
        alert('Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmCancel) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/appointments/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAppointments(prev =>
        prev.map((a) => (a._id === id ? { ...a, status: 'cancelled' } : a))
      );
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div className="appointments">
      <h2>All Appointments</h2>
      {appointments.map((appt) => (
        <div className="appointment-card" key={appt._id}>
          <p><strong>Doctor:</strong> {appt.doctor}</p>
          <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {appt.status}</p>
          {appt.status !== 'cancelled' && (
            <button className="cancel-btn" onClick={() => cancelAppointment(appt._id)}>
              Cancel Appointment
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
export default MyAppointments;


