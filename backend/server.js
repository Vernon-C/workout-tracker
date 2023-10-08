require('dotenv').config();  // Gets data from .env file

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Creates ExpressJS app
const app = express();

// Middleware: Runs during every request (i.e. This will run first b4 the ones below)
app.use(express.json());  // Can detect a body from every request

app.use((req, res, next) => {
  console.log(req.path, req.method);  // Prints req on the console
  next();  // Needed to go to the next request
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);  // e.g. /api/users/singin

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listens for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error)
  });
