const express = require('express');
const router = express.Router();
const workoutController = require("../controllers/workoutController");

router.get("/", workoutController.index);

module.exports = router;