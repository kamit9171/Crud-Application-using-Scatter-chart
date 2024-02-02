// CreateForm.js
import React, { useState } from 'react';
import { TextField,Button } from '@mui/material';

const CreateForm = ({addDataPoint }) => {
  const [formData, setFormData] = useState({ id: '', x: '', y: '', label: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addDataPoint(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
  <TextField
    label="ID"
    type="text"
    name="id"
    value={formData.id}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  <TextField
    label="X Coordinate"
    type="text"
    name="x"
    value={formData.x}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  <TextField
    label="Y Coordinate"
    type="text"
    name="y"
    value={formData.y}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  <TextField
    label="Label"
    type="text"
    name="label"
    value={formData.label}
    onChange={handleChange}
    fullWidth
    margin="normal"
  />
  <Button type="submit" variant="contained" color="primary">
    Create
  </Button>
</form>
  );
};

export default CreateForm;
