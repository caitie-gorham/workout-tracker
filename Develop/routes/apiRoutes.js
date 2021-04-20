const router = require("express").Router();
const db = require("../models");

router.get('api/workouts', (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
    })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", ({ params: { id }, body }, res) => {
    console.log('body', body);
    db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: body } }, { new: true })
        .then(dbWorkout => {
            console.log('dbWorkout', dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log('err', err);
            res.json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$duration"
                },
                totalDistance: {
                    $sum: "$distance"
                },
                totalWeight: {
                    $sum: "$weight"
                },
                totalReps: {
                    $sum: "$reps"
                },
                totalSets: {
                    $sum: "$sets"
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