import React, { useEffect, useState } from 'react';
import './Doctors.css';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: '',
  });

  // ✅ Load from localStorage once on mount
  useEffect(() => {
    const savedDoctors = localStorage.getItem('doctors');
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors));
    }
  }, []);

  // ✅ Save to localStorage whenever doctors list changes
  useEffect(() => {
    localStorage.setItem('doctors', JSON.stringify(doctors));
  }, [doctors]);

  // ✅ Add or Edit Doctor
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      const updated = doctors.map(doc =>
        doc.id === editId ? { ...formData, id: editId } : doc
      );
      setDoctors(updated);
    } else {
      const newDoctor = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
      };
      setDoctors([newDoctor, ...doctors]);
    }

    // Reset form
    setFormData({ name: '', specialization: '', contact: '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (doc) => {
    setFormData({
      name: doc.name,
      specialization: doc.specialization,
      contact: doc.contact,
    });
    setEditId(doc.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this doctor?")) {
      setDoctors(doctors.filter((d) => d.id !== id));
    }
  };

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">
      <h2>👨‍⚕️ Doctor Management</h2>

      <div className="doctors-header">
        <input
          type="text"
          placeholder="🔍 Search Doctor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormData({ name: '', specialization: '', contact: '' });
          }}
        >
          ➕ Add Doctor
        </button>
      </div>

      <div className="doctors-list">
        {filteredDoctors.length === 0 ? (
          <p>No doctors found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.specialization}</td>
                  <td>{doc.contact}</td>
                  <td>{doc.createdAt || "-"}</td>
                  <td>
                    <button onClick={() => handleEdit(doc)}>✏️</button>
                    <button onClick={() => handleDelete(doc.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <form className="form-popup" onSubmit={handleSubmit}>
            <h3>{editId ? "Edit Doctor" : "Add Doctor"}</h3>
            <input
              type="text"
              placeholder="Name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Specialization"
              required
              value={formData.specialization}
              onChange={(e) =>
                setFormData({ ...formData, specialization: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Contact"
              required
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <div className="form-actions">
              <button type="submit">{editId ? "Update" : "Add"}</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
