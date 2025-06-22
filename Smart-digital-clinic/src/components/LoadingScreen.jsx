// ✅ File: src/components/LoadingScreen.jsx
import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";
import logo from "../assets/clinic-logo.png"; // 👈 use your clinic logo here

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay animation for smoother entry (e.g., 400ms)
    const timer = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-screen ${show ? "fade-in" : ""}`}>
      <img src={logo} alt="Smart Digital Clinic" className="logo-spin" />
      <h2>Welcome to Smart Digital Clinic</h2>
      <p>Loading your dashboard...</p>
    </div>
  );
}
