// ✅ File: src/pages/Auth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!form.email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, form.email);
      setMessage("📩 Password reset link sent to your email.");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleAuth}>
        <h1 className="login-header">📋 Smart Digital Clinic</h1>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <p className="auth-error">{error}</p>}
        {message && <p className="auth-message">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
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

        <p
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setMessage("");
          }}
        >
          {isLogin ? "Don’t have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
