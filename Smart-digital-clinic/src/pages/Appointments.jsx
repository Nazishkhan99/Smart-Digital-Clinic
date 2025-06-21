import React, { useEffect, useState } from 'react';
import './Appointments.css';

export default function Appointments() {
  // ✅ Initial state loaded from localStorage safely
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });

  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    doctor: '',
    date: '',
    reason: ''
  });

  // ✅ Save appointments to localStorage when changed
  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  // ✅ Add a new appointment
  const handleAdd = (e) => {
    e.preventDefault();
    const { patient, doctor, date, reason } = newAppointment;

    if (!patient || !doctor || !date || !reason) {
      alert('Please fill in all fields.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...newAppointment
    };

    setAppointments([newEntry, ...appointments]);
    setNewAppointment({ patient: '', doctor: '', date: '', reason: '' });
  };

  // ✅ Delete an appointment
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="appointments-page">
      <h2>📅 Appointments</h2>

      {/* ✅ Appointment Booking Form */}
      <form className="appointment-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Patient Name"
          value={newAppointment.patient}
          onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
        />

        <input
          type="text"
          placeholder="Doctor Name"
          value={newAppointment.doctor}
          onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
        />

        <input
          type="date"
          value={newAppointment.date}
          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Reason"
          value={newAppointment.reason}
          onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
        />

        <button type="submit">➕ Book Appointment</button>
      </form>

      {/* ✅ List of Appointments */}
      <div className="appointment-list">
        <h3>📋 Upcoming Appointments</h3>

        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.patient}</td>
                  <td>{appt.doctor}</td>
                  <td>{appt.date}</td>
                  <td>{appt.reason}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(appt.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
