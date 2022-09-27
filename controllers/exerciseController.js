const fs = require('fs');

// '/exercise' => get list of all exercises
const index = (_req, res) => {
    const exerciseData = JSON.parse(fs.readFileSync("./data/exercises.json"));
    res.json(exerciseData);
};

// '/exercise/:bodyPart' => get list of exercises relating a body part
const getByBodyPart = (req, res) => {
    const bodyPart = req.params.bodyPart;
    const exerciseData = JSON.parse(fs.readFileSync("./data/exercises.json"));
    const filteredData = exerciseData.filter(exercise => exercise.bodyPart === bodyPart);
    res.json(filteredData);
};

// '/exercise/search/:q' => get list of exercises containing search word
const getBySearch = (req, res) => {
    const q = req.params.q.toLowerCase();
    const exerciseData = JSON.parse(fs.readFileSync("./data/exercises.json"));
    const filteredData = exerciseData.filter(exercise => exercise.name.includes(q) || 
        exercise.bodyPart.includes(q) || exercise.target.includes(q) || exercise.equipment.includes(q));
    res.json(filteredData);
};

module.exports = {
    index,
    getByBodyPart,
    getBySearch
}