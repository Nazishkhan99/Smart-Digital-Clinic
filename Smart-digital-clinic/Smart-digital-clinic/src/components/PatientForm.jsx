import React, { useState, useEffect } from 'react';
import './PatientForm.css';

export default function PatientForm({ onAdd, onUpdate, editingPatient }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    disease: ''
  });

  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient);
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.age || !formData.disease) {
      return alert('Please fill all fields');
    }
    editingPatient ? onUpdate(formData) : onAdd(formData);
    setFormData({ name: '', age: '', disease: '' });
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Patient Name" value={formData.name} onChange={handleChange} />
      <input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
      <input name="disease" placeholder="Disease" value={formData.disease} onChange={handleChange} />
      <button type="submit">{editingPatient ? 'Update' : 'Add'} Patient</button>
    </form>
  );
}
