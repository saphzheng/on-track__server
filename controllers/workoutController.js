const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/workout' => get list of all workouts
const index = (_req, res) => {
    const workoutData = JSON.parse(fs.readFileSync("./data/workouts.json"));
    res.json(workoutData);
}

// '/workout/:date' => get specific workout based on date
const getWorkoutByDate = (req, res) => {
    const date = req.params.date;
    const workoutData = JSON.parse(fs.readFileSync("./data/workouts.json"));
    const selectedWorkout = workoutData.find(workout => workout.date === date);
    if (selectedWorkout === -1) {
        return res.status(404).send("Error - Cannot find workout for that date.");
    } 
    return res.json(selectedWorkout);
}

module.exports = {
    index,
    getWorkoutByDate
}