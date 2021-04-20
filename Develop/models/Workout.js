const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercise: [{
        name: {
            type: String,
            trim: true,
            required: "You must provide a name for the exercise"
        },
        type: {
            type: String,
            trim: true,
            required: "You must provide an exercise type"
        },
        weight: {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        duration: {
            type: Number
        }
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;