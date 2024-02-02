// DataPoint.js
import React from 'react';

const DataPoint = ({ id, x, y, label, onUpdate, onDelete }) => {
  return (
    <div className="chart-info">
      <p>ID: {id}</p>
      <p>X-Coordinate: {x}</p>
      <p>Y-Coordinate: {y}</p>
      <p>Label: {label}</p>

      <div className="chart-buttons">
        <button onClick={onUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DataPoint;
