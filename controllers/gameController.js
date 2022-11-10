const Game = require("../models/Game");
const AdventureGame = require("../models/AdventureGame");
const TimelineGame = require("../models/TimelineGame");

async function showAllGames(req, res) {
  try {
    const games = await Game.getAllGames();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function showAllAdventureGames(req, res) {
  try {
    const adventureGames = await AdventureGame.getAllAdventureGames();
    res.json(adventureGames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function showAllTimelineGames(req, res) {
  try {
    const timelineGames = await TimelineGame.getAllTimelineGames();
    res.json(timelineGames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  showAllGames,
  showAllAdventureGames,
  showAllTimelineGames,
};
