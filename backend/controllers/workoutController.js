const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET all workouts
const getWorkouts = async (req, res) => {
  // Show only the user's workouts
  const user_id = req.user._id;

  const workouts = await Workout.find({user_id}).sort({createdAt: -1});

  res.status(200).json(workouts);
}

// GET a single workout
const getWorkout = async (req, res) => {
  const {id} = req.params;  // Gets it from the address bar

  // Prevent false ids from crashing the server
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Workout doesn't exist"});
  }

  const workout = await Workout.findById(id);

  // Kills the function if workout cannot be found
  if (!workout) {
    return res.status(404).json({error: "Workout doesn't exist"});
  }

  res.status(200).json(workout);
}

// POST a new workout
const createWorkout = async (req, res) => {
  const {title, reps, load} = req.body;

  // Error checks, if the array has even 1 missing attribute, return
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all fields", emptyFields});
  }

  // Add record to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({title, reps, load, user_id});  // .create is async, store response in workout
    res.status(200).json(workout);  // A-OK response, print details
  } catch (error) {
    res.status(400).json({error: error.message});
  }

  //res.json({msg: "POST a new workout"});
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Workout doesn't exist"});
  }

  const workout = await Workout.findOneAndDelete({_id: id});  // Just has to be like this

  if (!workout) {
    return res.status(404).json({error: "Workout doesn't exist"});
  }

  res.status(200).json(workout);
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "Workout doesn't exist"});
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body  // Update to what's in the body
  });

  if (!workout) {
    return res.status(404).json({error: "Workout doesn't exist"});
  }

  res.status(200).json(workout);
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
};
