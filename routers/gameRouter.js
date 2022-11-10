const { Router } = require("express");

const gameController = require("../controllers/gameController");

const gameRouter = Router();

gameRouter.get("/", gameController.showAllGames); // get all games
gameRouter.get("/adventure", gameController.showAllAdventureGames); //get all adventure games
gameRouter.get("/adventure/:id", gameController.showAdventure); // get one adventure game
gameRouter.get("/timeline", gameController.showAllTimelineGames); // get all timeline games

module.exports = gameRouter;
