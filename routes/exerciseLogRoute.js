const express = require('express');
const router = express.Router();
const exerciseLogController = require("../controllers/exerciseLogController");

// '/exerciseLog' routes
router.route('/')
    .get(exerciseLogController.index)
    .post(exerciseLogController.addExerciseLog);

// '/exerciseLog/:date' routes
router.route('/:date')
    .get(exerciseLogController.getExerciseLogsByDate);

module.exports = router;