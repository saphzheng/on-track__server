const fs = require('fs');
const { v4: uuid } = require('uuid');

// '/exercise' => get list of all exercises
const index = (_req, res) => {
    const exerciseData = JSON.parse(fs.readFileSync("./data/exercises.json"));
    res.json(exerciseData);
}

// '/exercise/:bodyPart' => get list of exercises relating a body part
const getByBodyPart = (req, res) => {
    const bodyPart = req.params.bodyPart;
    const exerciseData = JSON.parse(fs.readFileSync("./data/exercises.json"));
    const filteredData = exerciseData.filter(exercise => exercise.bodyPart === bodyPart);
    res.json(filteredData);
}

module.exports = {
    index,
    getByBodyPart
}