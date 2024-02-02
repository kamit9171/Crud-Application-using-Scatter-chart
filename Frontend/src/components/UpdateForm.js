// UpdateForm.js
import React, { useState } from 'react';
import {TextField, Button } from '@mui/material';

const UpdateForm = ({ data, updateData, onCancel }) => {
  const [updatedData, setUpdatedData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(updatedData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <TextField
        label="ID"
        type="text"
        name="id"
        value={updatedData.id}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="X Coordinate"
        type="text"
        name="x"
        value={updatedData.x}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Y Coordinate"
        type="text"
        name="y"
        value={updatedData.y}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Label"
        type="text"
        name="label"
        value={updatedData.label}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" type="submit"style={{ marginRight: '8px' }} >
        Update
      </Button>
      <Button variant="contained" color="error" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
};

export default UpdateForm;
