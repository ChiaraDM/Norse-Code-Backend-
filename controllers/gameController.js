const Game = require('../models/Game');

async function index (req, res) {
    try {
        const games = await Game.getAllGames();
        res.json(games);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
}

module.exports = {
    index
}