import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Footer from "./components/Footer";
import MedicalRecords from "./pages/MedicalRecords"; // Adjust path if needed

import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

function AppContent() {
  const isAuthenticated = localStorage.getItem('authUser');
  const location = useLocation();

  const showNavbar = location.pathname !== '/auth';

  return (
    <>
      {isAuthenticated && showNavbar && <Navbar />}

      <Routes>
        <Route path="/auth" element={<Auth />} />

        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/form" element={<PatientForm />} />
            <Route path="/list" element={<PatientList />} />
         

          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth" />} />
        )}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
      <Footer />
    </Router>
  );
}
