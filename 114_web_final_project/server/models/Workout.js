const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    load: {
        type: Number,
        required: false
    },
    reps: {
        type: Number,
        required: false
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
