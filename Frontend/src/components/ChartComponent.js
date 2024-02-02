import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';
import Create from './CreateForm';
import Update from './UpdateForm';
import './ChartComponent.css';
import { Button } from '@mui/material';



const ChartComponent = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    fetchData();
  }, []);

  const updateDataPoint = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5000/data/${updatedData.id}`, updatedData);
      fetchData();
      setSelectedPointIndex(null);
      setShowUpdateForm(false);
      setIsUpdateClicked(false); // Reset the state after update
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this data point?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/data/${dataPoints[index].id}`);
        fetchData();
        setSelectedPointIndex(null);
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const addDataPoint = async (newData) => {
    try {
      await axios.post('http://localhost:5000/data', newData);
      fetchData();
      setShowCreateForm(false); // Hide create form after adding a new data point
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data');
      setDataPoints(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleUpdateClick = (index) => {
    console.log('dataPoints:', dataPoints);
    console.log('selectedPointIndex:', selectedPointIndex);

    if (dataPoints[index]) {
      setSelectedPointIndex(index);
      setShowUpdateForm(true);
      setIsUpdateClicked(true);
    }
  };

  const DataTable = ({ dataPoints, setSelectedPointIndex, handleUpdateClick, handleDelete }) => {
    return (
      <TableContainer component={Paper} style={{ marginLeft: '15px', marginTop: '50px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>X-Coordinate</TableCell>
              <TableCell>Y-Coordinate</TableCell>
              <TableCell>Label</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPoints.map((point, index) => (
              <TableRow key={point.id} onClick={() => setSelectedPointIndex(index)}>
                <TableCell>{point.id}</TableCell>
                <TableCell>{point.x}</TableCell>
                <TableCell>{point.y}</TableCell>
                <TableCell>{point.label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className="container">
      <div>
        <header>
          <h1>Scatter Chart CRUD Application</h1>

        </header>
      </div>



      <div className="left-side">
        <nav>

        </nav>
        <DataTable
          dataPoints={dataPoints}
          setSelectedPointIndex={setSelectedPointIndex}
          handleUpdateClick={handleUpdateClick}
          handleDelete={handleDelete}
        />
        <ul>

          <Button variant="contained" color="success" onClick={() => setShowCreateForm((prevShowCreateForm) => !prevShowCreateForm)}>
            Create Point
          </Button>

        </ul>
        {showCreateForm && <Create addDataPoint={addDataPoint} />}
        {selectedPointIndex !== null && !showUpdateForm && (
          <div className="chart-info" style={{ marginLeft: '15px' }}>
            <p>ID: {dataPoints[selectedPointIndex].id}</p>
            <p>X-Coordinate: {dataPoints[selectedPointIndex].x}</p>
            <p>Y-Coordinate: {dataPoints[selectedPointIndex].y}</p>
            <p>Label: {dataPoints[selectedPointIndex].label}</p>

            <div className="chart-buttons" >
              {isUpdateClicked ? (
                <Update
                  data={dataPoints[selectedPointIndex]}
                  updateData={updateDataPoint}
                  onCancel={() => {
                    setShowUpdateForm(false);
                    setIsUpdateClicked(true);
                  }}
                />
              ) : (
                <React.Fragment>



                  <Button onClick={(e) => handleUpdateClick(selectedPointIndex)} variant="contained" color="primary" style={{ marginRight: '8px' }}>
                    Update
                  </Button>
                  <Button onClick={(e) => handleDelete(selectedPointIndex)} variant="contained" color="error">
                    Delete
                  </Button>



                </React.Fragment>
              )}
            </div>
          </div>
        )}
        {selectedPointIndex !== null && isUpdateClicked && (
          <Update
            data={dataPoints[selectedPointIndex]}
            updateData={updateDataPoint}
            onCancel={() => {
              setShowUpdateForm(false);
              setIsUpdateClicked(false);
            }}
          />
        )}
      </div>


      <div className="right-side">
        <div className="scatter-chart">
          <Scatter
            data={{
              datasets: [
                {
                  label: 'Data Points',
                  data: dataPoints,
                  backgroundColor: (context) => (context.dataIndex === selectedPointIndex ? 'blue' : 'red'),
                },
              ],
            }}
            options={{
              animation: false,
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: {
                    display: true,
                    text: 'X',
                  },
                },
                y: {
                  type: 'linear',
                  position: 'left',
                  title: {
                    display: true,
                    text: 'Y',
                  },
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
          <section id="frontend">
            <h2>Frontend:</h2>
            <ul>
              <li><strong>React:</strong> A JavaScript library for building user interfaces.</li>
              <li><strong>React Chartjs 2:</strong> A React wrapper for Chart.js, ideal for creating interactive charts.</li>
              <li><strong>Material-UI:</strong> A React UI framework using Material Design components for a consistent look and feel.</li>
              <li><strong>Axios:</strong> A promise-based HTTP client for making API requests in React applications.</li>
            </ul>
          </section>

          <section id="backend">
            <h2>Backend:</h2>
            <ul>
              <li><strong>Express.js:</strong> A minimal and flexible Node.js web application framework.</li>
              <li><strong>Database (MySQL):</strong> A popular open-source relational database management system for data storage.</li>
            </ul>
          </section>

        </div>





      </div>
    </div>

  );
};

export default ChartComponent;
