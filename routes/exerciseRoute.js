const express = require('express');
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// '/exercise' routes
router.route('/').get(exerciseController.index);

// '/exercise/:bodyPart' routes
router.route('/:bodyPart').get(exerciseController.getByBodyPart);

module.exports = router;