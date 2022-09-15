// dependencies
const express = require('express');
// const expressSession = require('express-session');
const cors = require('cors');
// const helmet = require('helmet');
// const passport = require('passport');
// const knex = require('knex')(require('./knexfile.js').development);

// express app instance
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
require('dotenv').config();
app.use(express.json());
// app.use(helmet());
app.use(cors());
// app.use(cors({origin: true, credentials: true,}));
// app.use(expressSession({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));

// routes
const exerciseRoutes = require('./routes/exerciseRoute');
const workoutRoutes = require('./routes/workoutRoute');

app.use("/exercise", exerciseRoutes);
app.use("/workout", workoutRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});