const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const workoutRoutes = require('./routes/workouts');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to db (Mocking mode: DB connection skipped)
// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sports-tracking')
//   .then(() => {
// Listen for requests
app.listen(process.env.PORT || 4000, () => {
    console.log('Connected to db & listening on port', process.env.PORT || 4000);
});
//   })
//   .catch((error) => {
//     console.log(error);
//   });
