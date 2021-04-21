const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Exercise = new Schema({
	type: {
		type: String,
	},
	name: {
		type: String,
	},
	duration: {
		type: Number,
	},
	distance: {
		type: Number
	},
	weight: {
		type: Number
	},
	reps: {
		type: Number
	},
	sets: {
		type: Number
	}
});
const WorkoutSchema = new Schema({
	day: {
			type:Date,
			default:Date.now
	},
	exercises: [Exercise]
});

const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
module.exports = WorkoutModel;