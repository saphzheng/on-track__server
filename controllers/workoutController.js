const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/workout' => get list of all workouts
const index = (_req, res) => {
    const workoutData = JSON.parse(fs.readFileSync("./data/workouts.json"));
    res.json(workoutData);
}

const getWorkoutByDate = (req, res) => {
    const workoutData = JSON.parse(fs.readFileSync("./data/workouts.json"));
}

module.exports = {
    index
}