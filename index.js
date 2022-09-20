// dependencies
const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
// const knex = require('knex')(require('./knexfile.js').development);

// express app instance
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
require('dotenv').config();
app.use(express.json());
app.use(cors());

const verifyJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-3av77v7a.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://onTrack.com/api/v2/',
    issuer: 'https://dev-3av77v7a.us.auth0.com/',
    algorithms: ['RS256']
}).unless({ path: ['/'] });

app.use(verifyJwt);

// routes
const userRoutes = require('./routes/userRoute');
const exerciseRoutes = require('./routes/exerciseRoute');
const exerciseLogRoutes = require('./routes/exerciseLogRoute');
const workoutRoutes = require('./routes/workoutRoute');

app.use("/user", userRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/exerciseLog", exerciseLogRoutes);
app.use("/workout", workoutRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});