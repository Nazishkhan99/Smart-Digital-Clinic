import React, { useEffect, useState } from 'react';
import './MedicalRecords.css';

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    diagnosis: '',
    prescription: ''
  });

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('records');
    if (stored) setRecords(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.diagnosis || !formData.prescription) return;

    if (editId !== null) {
      setRecords(records.map(r => r.id === editId ? { id: editId, ...formData } : r));
      setEditId(null);
    } else {
      setRecords([{ id: Date.now(), ...formData }, ...records]);
    }

    setFormData({ name: '', date: '', diagnosis: '', prescription: '' });
    setShowForm(false);
  };

  const handleEdit = (record) => {
    setFormData(record);
    setEditId(record.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  const filteredRecords = records.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickAdd = (medicine) => {
    const updated = formData.prescription
      ? `${formData.prescription}, ${medicine}`
      : medicine;
    setFormData({ ...formData, prescription: updated });
  };

  return (
    <div className="records-page">
      <h2>📁 Medical Records</h2>

      <div className="records-header">
        <input
          type="text"
          placeholder="🔍 Search by patient name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={() => {
            setFormData({ name: '', date: '', diagnosis: '', prescription: '' });
            setEditId(null);
            setShowForm(true);
          }}
        >
          ➕ Add Record
        </button>
      </div>

      <div className="records-list">
        {filteredRecords.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Diagnosis</th>
                <th>Prescription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.name}</td>
                  <td>{record.date}</td>
                  <td>{record.diagnosis}</td>
                  <td>{record.prescription}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(record)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(record.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-popup">
            <h3>{editId !== null ? 'Edit Record' : 'Add New Record'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Patient Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                required
              />

              {/* 👇 Enhanced Prescription Section */}
              <div className="prescription-group">
                <textarea
                  rows="3"
                  placeholder="Write detailed prescription..."
                  value={formData.prescription}
                  onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                  required
                />
                <div className="prescription-suggestions">
                  <label>💊 Quick Add:</label>
                  {['Paracetamol 500mg', 'Ibuprofen 200mg', 'Amoxicillin 250mg', 'Vitamin D3'].map((med) => (
                    <button key={med} type="button" onClick={() => handleQuickAdd(med)}>
                      {med}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit">{editId !== null ? 'Update' : 'Add'} Record</button>
                <button type="button" onClick={() => { setShowForm(false); setEditId(null); }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
