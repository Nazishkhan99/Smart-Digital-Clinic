import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAuth = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (isLogin) {
      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );
      if (user) {
        localStorage.setItem("authUser", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      const userExists = users.some((u) => u.email === form.email);
      if (userExists) {
        setError("User already exists.");
      } else {
        users.push(form);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("authUser", JSON.stringify(form));
        navigate("/");
      }
    }
  };

  const handleForgotPassword = () => {
    setError("");
    setMessage("");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === form.email);

    if (!validateEmail(form.email)) {
      setError("Enter your registered email first.");
      return;
    }

    if (userExists) {
      setMessage("📩 Password reset link has been sent to your email (simulated).");
    } else {
      setError("No user found with this email.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleAuth}>
        <h1 className="login-header">📋Smart Digital Clinic</h1>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-message">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>

        {isLogin && (
          <p
            onClick={handleForgotPassword}
            style={{ marginTop: "10px", cursor: "pointer", color: "#c81a03" }}
          >
            Forgot Password?
          </p>
        )}

        <p onClick={() => { setIsLogin(!isLogin); setError(""); setMessage(""); }}>
          {isLogin
            ? "Don’t have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
