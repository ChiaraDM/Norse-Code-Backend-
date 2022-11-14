// external imports
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// internal imports
const logRoutes = require('./middleware/logger');
// routes
const gameRouter = require('./routers/gameRouter');
const userRouter = require('./routers/userRouter');
// configuration
const api = express();

api.use(cors({ origin: true, credentials: true}));
api.use(express.json());
api.use(cookieParser());
api.use(logRoutes);

// base route
api.get("/", (req, res) => {
    res.json({
        name: "Humanties App API",
        description: "An API to support our Humanities Game App"
    });
});

api.use("/games", gameRouter);
api.use("/users", userRouter);


module.exports = api;