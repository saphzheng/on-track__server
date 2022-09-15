const express = require('express');
const router = express.Router();
const exerciseLogController = require("../controllers/exerciseLogController");

// '/exerciseLog' routes
router.route('/').get(exerciseLogController.index);

// '/exerciseLog/:bodyPart' routes
router.route('/:workoutId').get(exerciseLogController.addExerciseLog);

module.exports = router;