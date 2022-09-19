// dependencies
const express = require('express');
const cors = require('cors');
// const knex = require('knex')(require('./knexfile.js').development);

// express app instance
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
require('dotenv').config();
app.use(express.json());
app.use(cors());

// routes
const exerciseRoutes = require('./routes/exerciseRoute');
const exerciseLogRoutes = require('./routes/exerciseLogRoutes');
const workoutRoutes = require('./routes/workoutRoute');

app.use("/exercise", exerciseRoutes);
app.use("/exerciseLog", exerciseLogRoutes);
app.use("/workout", workoutRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});