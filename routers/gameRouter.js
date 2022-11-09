const { Router } = require('express');

const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get("/", gameController.index); // get all games

module.exports = gameRouter;