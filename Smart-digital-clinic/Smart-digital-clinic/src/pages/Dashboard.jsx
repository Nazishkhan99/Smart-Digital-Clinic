// ✅ File: src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import PatientChart from "../components/PatientChart";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    appointments: 0,
    doctors: 0,
    records: 0
  });

  useEffect(() => {
    // Simulate fetching from localStorage or API
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const doctors = JSON.parse(localStorage.getItem('doctors')) || [];
    const records = JSON.parse(localStorage.getItem('records')) || [];

    setStats({
      patients: patients.length,
      appointments: appointments.length,
      doctors: doctors.length,
      records: records.length
    });
  }, []);

  return (
    <div className="dashboard">
      <h2>📊 Clinic Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Patients</h3>
          <p>{stats.patients}</p>
        </div>
        <div className="card">
          <h3>Appointments</h3>
          <p>{stats.appointments}</p>
        </div>
        <div className="card">
          <h3>Doctors</h3>
          <p>{stats.doctors}</p>
        </div>
        <div className="card">
          <h3>Medical Records</h3>
          <p>{stats.records}</p>
        </div>
      </div>
      <PatientChart />
    </div>
  );
}
