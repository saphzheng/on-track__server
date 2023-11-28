// dependencies
const express = require('express');
const cors = require('cors');
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

// express app instance
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
require('dotenv').config();
app.use(express.json());
app.use(cors({origin: '*'}));

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
const exerciseRoutes = require('./routes/exerciseRoute');
const exerciseLogRoutes = require('./routes/exerciseLogRoute');

app.use("/exercise", exerciseRoutes);
app.use("/exerciseLog", exerciseLogRoutes);

app.get('/', (_req, res) => {
    res.send("Ontrack API");
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});