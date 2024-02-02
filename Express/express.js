const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlConnection = require('./db'); // Update the path to your db.js file

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/data', (req, res) => {
  mysqlConnection.query('SELECT * FROM dataPoints', (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

app.post('/data', (req, res) => {
  const newDataPoint = req.body;
  mysqlConnection.query('INSERT INTO dataPoints SET ?', newDataPoint, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    newDataPoint.id = results.insertId;
    res.json(newDataPoint);
  });
});

app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedDataPoint = req.body;
  mysqlConnection.query(
    'UPDATE dataPoints SET ? WHERE id = ?',
    [updatedDataPoint, id],
    (error) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(updatedDataPoint);
    }
  );
});

app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  mysqlConnection.query('DELETE FROM dataPoints WHERE id = ?', id, (error) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Data point deleted successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
