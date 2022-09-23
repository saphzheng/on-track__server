const express = require('express');
const router = express.Router();
const workoutController = require("../controllers/workoutController");

router.get("/", workoutController.index);

router.get("/:date", workoutController.getWorkoutByDate);

module.exports = router;