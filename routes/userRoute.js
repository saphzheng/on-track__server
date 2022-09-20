const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// '/user' routes
router.route('/').get(userController.index);

module.exports = router;