
// Require Express to run server and routes

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
app.use(express.json());

// GET route to return projectData
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST Route
app.post('/add', (req, res) => {
    const { date, temp, feel } = req.body;
    projectData = { date, temp, feel }; // Update projectData with new entry
    res.json({ message: 'Data added successfully!', projectData });
  });

// Setup Server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});