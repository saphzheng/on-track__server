const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/exerciseLog' => get list of all exercise logs
const index = (_req, res) => {
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    res.json(logData);
}

// '/exerciseLog/:date' => get specific workouts based on date
const getExerciseLogsByDate = (req, res) => {
    const date = req.params.date;
    const { user } = req.query;
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    const workout = logData.filter(log => log.user === user && log.date === date);
    if (workout === []) {
        return res.status(404).send("Error - Cannot find workout data for that date.");
    } 
    return res.json(workout);
}

// post /exerciseLog => add new exercise log as part of a workout
const addExerciseLog = (req, res) => {
    // get new exercise data from request body and validate data
    const { exerciseName, weight, sets, reps, date, user } = req.body;
    // check that exercise name is non-empty
    if (!exerciseName || !date || !user) {
        return res.status(400).send("Error in request - exercise, date and user must be non-empty.");
    }
    // create new warehouse object
    const newExerciseLog =   {
        "id": uuid(),
        exerciseName,
        weight,
        sets,
        reps,
        date,
        user
    };
    // get current exercise log data and push new log to existing array
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    logData.push(newExerciseLog);
    // write the updated data back to the json file
    fs.writeFileSync("./data/exerciseLogs.json", JSON.stringify(logData));
    // send back the new log location
    const newExerciseLogURL = `/workout/${date}`;
    res.status(201).location(newExerciseLogURL).send(newExerciseLogURL);
};

module.exports = {
    index,
    getExerciseLogsByDate,
    addExerciseLog
}