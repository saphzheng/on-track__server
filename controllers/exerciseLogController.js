const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/exerciseLog/?user=:user' => get all logs for a specific user
const index = (req, res) => {
    const { user } = req.query;
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    // filter for logs that match the user
    const workout = logData.filter(log => log.user === user);
    if (workout === []) {
        return res.status(404).send("Error - Cannot find workout data for that user.");
    } 
    return res.json(workout);
};

// '/exerciseLog/:date/?user=:user' => get specific logs for user based on date
const getExerciseLogsByDate = (req, res) => {
    const date = req.params.date;
    const { user } = req.query;
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    // filter for logs that match the user and date
    const workout = logData.filter(log => log.user === user && log.date === date);
    if (workout === []) {
        return res.status(404).send("Error - Cannot find workout data for that date.");
    } 
    return res.json(workout);
};

// post /exerciseLog => add new exercise log
const addExerciseLog = (req, res) => {
    const { exerciseName, weight, sets, reps, date, user } = req.body;
    // check that exercise name, date and user are non-empty
    if (!exerciseName || !date || !user) {
        return res.status(400).send("Error in request - exercise, date and user must be non-empty.");
    }
    const newExerciseLog =   {
        "id": uuid(),
        exerciseName,
        weight,
        sets,
        reps,
        date,
        user
    };
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    logData.push(newExerciseLog);
    fs.writeFileSync("./data/exerciseLogs.json", JSON.stringify(logData));
    // send back the new log location
    const newExerciseLogURL = `/workout/${date}`;
    res.status(201).location(newExerciseLogURL).send(newExerciseLogURL);
};

// '/exerciseLog/:id' => delete specified exercise log
const deleteExerciseLog = (req, res) => {
    const id = req.params.id;
    const logData = JSON.parse(fs.readFileSync("./data/exerciseLogs.json"));
    // return if specified exercise log cannot be found
    if (logData.find(log => (log.id === id)) === -1) {
        return res.status(404).send("Error - Cannot find workout data to delete for that date.");
    } 
    // filter for logs that do not match both user and date
    const newData = logData.filter(log => log.id !== id);
    fs.writeFileSync("./data/exerciseLogs.json", JSON.stringify(newData));
    res.status(204).send(`Exercise Log with id: ${id} has been deleted.`)
};

module.exports = {
    index,
    getExerciseLogsByDate,
    addExerciseLog,
    deleteExerciseLog
}