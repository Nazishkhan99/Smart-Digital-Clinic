import React from 'react';
import './PatientList.css';

export default function PatientList({ patients, onDelete, onEdit }) {
  if (patients.length === 0) return <p>No patients yet.</p>;

  return (
    <div className="patient-list">
      {patients.map(p => (
        <div className="patient-card" key={p.id}>
          <h4>{p.name}</h4>
          <p>Age: {p.age}</p>
          <p>Disease: {p.disease}</p>
          <div className="actions">
            <button onClick={() => onEdit(p)}>✏️ Edit</button>
            <button onClick={() => onDelete(p.id)}>🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
