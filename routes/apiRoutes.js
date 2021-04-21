const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
  db.WorkoutModel.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", ({ params: { id }, body }, res) => {
  console.log('body', body);
  db.WorkoutModel.findOneAndUpdate({ _id: id }, { $push: { exercise: body } }, { new: true })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/api/workouts", ({ body }, res) => {
  db.WorkoutModel.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.WorkoutModel.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        },
        totalDistance: {
          $sum: "$exercises.distance"
        },
        totalWeight: {
          $sum: "$exercises.weight"
        },
        totalReps: {
          $sum: "$exercises.reps"
        },
        totalSets: {
          $sum: "$exercises.sets"
        }
      }
    }])
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router;