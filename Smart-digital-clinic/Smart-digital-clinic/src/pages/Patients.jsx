import React, { useState, useEffect } from 'react';
import './Patients.css';

export default function Patients() {
  // ✅ Initialize patients from localStorage
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('patients');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    condition: ''
  });

  // ✅ Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, gender, condition } = formData;

    if (!name || !age || !gender || !condition) {
      alert('Please fill in all fields.');
      return;
    }

    if (editId !== null) {
      const updated = patients.map((p) =>
        p.id === editId ? { id: editId, ...formData } : p
      );
      setPatients(updated);
      setEditId(null);
    } else {
      const newPatient = { id: Date.now(), ...formData };
      setPatients([newPatient, ...patients]);
    }

    setFormData({ name: '', age: '', gender: '', condition: '' });
    setShowForm(false);
  };

  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      condition: patient.condition
    });
    setEditId(patient.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="patients-page">
      <h2>👥 Patient Management</h2>

      {/* 🔍 Search + Add Button */}
      <div className="patients-header">
        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={() => {
            setFormData({ name: '', age: '', gender: '', condition: '' });
            setEditId(null);
            setShowForm(true);
          }}
        >
          ➕ Add Patient
        </button>
      </div>

      {/* 📋 Patient List Table */}
      <div className="patients-list">
        {filteredPatients.length === 0 ? (
          <p>No matching patients found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Condition</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.condition}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(patient)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(patient.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ✍️ Form Overlay */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-popup">
            <h3>{editId !== null ? 'Edit Patient' : 'Add New Patient'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                value={formData.age}
                required
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <select
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="text"
                placeholder="Condition"
                value={formData.condition}
                required
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              />

              <div className="form-actions">
                <button type="submit">{editId !== null ? 'Update' : 'Add'} Patient</button>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
