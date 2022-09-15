const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/exerciseLog' => get list of all exercise logs
const index = (_req, res) => {
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    res.json(logData);
}

// post /exerciseLog/:workoutId => add new exercise log as part of a workout
const addExerciseLog = (req, res) => {
    // get workoutId from url
    const workoutId = req.params.workoutId;
    // get new exercise data from request body and validate data
    const { exerciseName, weight, sets, reps } = req.body;
    // check that exercise name is non-empty
    if (!exerciseName) {
        return res.status(400).send("Error in request - exercise must be non-empty.");
    }
    // create new warehouse object
    const newExerciseLog =   {
        "id": uuid(),
        exerciseName,
        weight,
        sets,
        reps,
        workoutId
    };
    // get current exercise log data and push new log to existing array
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    logData.push(newExerciseLog);
    // write the updated data back to the json file
    fs.writeFileSync("./data/exerciseLogs.json", JSON.stringify(logData));
    // send back the new log location
    const newExerciseLogURL = `/workout/${workoutId}`;
    res.status(201).location(newExerciseLogURL).send(newExerciseLogURL);
};

module.exports = {
    index,
    addExerciseLog
}