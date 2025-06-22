import React, { useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    alert(`Language changed to ${e.target.value.toUpperCase()}`);
  };


  return (
    <footer className="smart-footer">
      <div className="footer-grid">
        {/* Branding */}
        <div className="footer-brand">
          <h3>🏥 Smart Digital Clinic</h3>
          <p>Advanced, reliable, and smart healthcare management system.</p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#">🏠 Home</a></li>
            <li><a href="#">👥 Patients</a></li>
            <li><a href="#">📅 Appointments</a></li>
            <li><a href="#">🩺 Doctors</a></li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-section">
          <h4>About</h4>
          <ul>
            <li><a href="#">📨 Contact Us</a></li>
            <li><a href="#">🔐 Privacy Policy</a></li>
            <li><a href="#">📜 Terms</a></li>
          </ul>
        </div>

        {/* Newsletter & Language */}
        <div className="footer-section">
          
          <div className="language-select">
            🌍 Language:
            <select value={language} onChange={handleLanguageChange}>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Smart Digital Clinic | Developed by Nazish Anwar Khan</p>

      </div>

    </footer>
  );
}
