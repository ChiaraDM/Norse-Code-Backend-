const { Router } = require('express');

const gameController = require('../controllers/gameController');

const gameRouter = Router();

gameRouter.get("/", gameController.showAllGames); // get all games
gameRouter.get("/adventure", gameController.showAllAdventureGames); //get all adventure games

module.exports = gameRouter;