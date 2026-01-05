const mongoose = require('mongoose');

// Mock data in memory
let workouts = [
    { _id: '1', title: 'Running', load: 0, reps: 0, duration: 30, distance: 5, createdAt: new Date().toISOString() },
    { _id: '2', title: 'Push ups', load: 0, reps: 50, duration: 10, distance: 0, createdAt: new Date().toISOString() }
];

// get all workouts
const getWorkouts = async (req, res) => {
    // Sort by createdAt desc
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.status(200).json(sortedWorkouts);
};

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    const workout = workouts.find(w => w._id === id);

    if (!workout) {
        return res.status(404).json({ error: 'No such workout' });
    }

    res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
    const { title, load, reps, duration, distance } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!duration) {
        emptyFields.push('duration');
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the required fields', emptyFields });
    }

    const newWorkout = {
        _id: Math.random().toString(36).substr(2, 9),
        title,
        load: load || 0,
        reps: reps || 0,
        duration: duration,
        distance: distance || 0,
        createdAt: new Date().toISOString()
    };

    workouts = [newWorkout, ...workouts];
    res.status(200).json(newWorkout);
};

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    const workoutIndex = workouts.findIndex(w => w._id === id);

    if (workoutIndex === -1) {
        return res.status(400).json({ error: 'No such workout' });
    }

    const deletedWorkout = workouts[workoutIndex];
    workouts = workouts.filter(w => w._id !== id);

    res.status(200).json(deletedWorkout);
};

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const workoutIndex = workouts.findIndex(w => w._id === id);

    if (workoutIndex === -1) {
        return res.status(400).json({ error: 'No such workout' });
    }

    workouts[workoutIndex] = { ...workouts[workoutIndex], ...req.body };
    res.status(200).json(workouts[workoutIndex]);
};

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
};
