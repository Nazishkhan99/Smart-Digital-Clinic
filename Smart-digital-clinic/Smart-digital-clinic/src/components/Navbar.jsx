import React, { useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Appointments", path: "/appointments" },
    { name: "Patients", path: "/patients" },
    { name: "Doctors", path: "/doctors" },
    { name: "Records", path: "/medical-records" },
    
  ];
    const logout = () => {
    localStorage.removeItem("authUser");
    navigate("/auth");
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">🩺 Smart Digital Clinic
                          </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {/* <button className="logout-btn" onClick={() => alert("Logout!")}>
              🔒 Logout
            </button> */}
            <button className="logout-btn"  onClick={logout}>🔓 Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
