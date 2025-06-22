import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoadingScreen from "./components/LoadingScreen";

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import MedicalRecords from './pages/MedicalRecords';

import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Auth from './pages/Auth';

import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function AppContent() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingScreen />;


  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {authUser && !isAuthPage && <Navbar />}

      <Routes>
        <Route path="/auth" element={<Auth />} />

        {authUser ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/form" element={<PatientForm />} />
            <Route path="/list" element={<PatientList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/auth" />} />
        )}
      </Routes>

      {/* ✅ Hide footer on login/signup page */}
      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
