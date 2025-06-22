import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("authUser"));
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });

  const sections = [
    {
      title: "🧍‍♂️ Patients",
      desc: "Manage, edit & track all patients.",
      path: "/patients",
    },
    {
      title: "📆 Appointments",
      desc: "View and book patient slots.",
      path: "/appointments",
    },
    {
      title: "📂 Medical Records",
      desc: "Full diagnosis & treatment details.",
      path: "/records",
    },
    {
      title: "🩺 Doctors",
      desc: "Manage doctor profiles & info.",
      path: "/doctors",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = time.getHours();
    if (hour < 12) setGreeting("🌅 Good Morning");
    else if (hour < 18) setGreeting("☀️ Good Afternoon");
    else setGreeting("🌙 Good Evening");
  }, [time]);
 
  useEffect(() => {
    const tips = [
      "🩺 Prevention is better than cure.",
      "💊 Always verify prescriptions.",
      "🧼 Hygiene is healing.",
      "🤝 Patient trust is key to care.",
      "❤️‍🩹 Stay kind and alert."
    ];
    setQuote(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("patients")) || [];
    const d = JSON.parse(localStorage.getItem("doctors")) || [];
    const a = JSON.parse(localStorage.getItem("appointments")) || [];
    setStats({ patients: p.length, doctors: d.length, appointments: a.length });
  }, []);

  const getCapitalizedName = (email) => {
  if (!email) return "User";
  const name = email.split("@")[0];
  return name.charAt(0).toUpperCase() + name.slice(1);
};


  return (
    <div className="home-container">
      <div className="top-bar">
  <h1>
    <span className="clinic-icon">🏥</span>
    <span className="clinic-text">Welcome to Smart Digital Clinic</span>
  </h1>
</div>

      <div className="welcome-block">
  <h2>{greeting}, {getCapitalizedName(user?.email)}!</h2>
  <p className="time">{time.toLocaleTimeString()} | {time.toDateString()}</p>
  <p className="quote">{quote}</p>
</div>


      <div className="stats-cards">
        <div className="stat-card">👥 Patients <span>{stats.patients}</span></div>
        <div className="stat-card">📅 Appointments <span>{stats.appointments}</span></div>
        <div className="stat-card">👨‍⚕️ Doctors <span>{stats.doctors}</span></div>
      </div>

      <h3 className="section-title">Start Exploring</h3>
      <div className="section-cards">
        {sections.map((sec, index) => (
          <div key={index} className="section-card" onClick={() => navigate(sec.path)}>
            <h4>{sec.title}</h4>
            <p>{sec.desc}</p>
            <button>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}
