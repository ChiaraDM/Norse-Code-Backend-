const db = require("../database/connect");
const Game = require("../models/Game");

class TimelineGame extends Game {
  constructor({ game_id, game_type, game_topic, game_description, cards }) {
    super(game_id, game_type, game_topic, game_description);
    this.cards = cards;
  }

  // all the timeline games
  // get all the cards for each game, and put it inside the game

  static async getAllTimelineGames() {
    const response = await db.query("SELECT * FROM game WHERE game_type = 'timeline'");
    const timelineGames = response.rows;

    const cards = [];
    for (let i = 0; i < timelineGames.length; i++) {
      const cardRes = await db.query("SELECT * FROM card WHERE game_id = $1", [i + 1]);
      cards.push(cardRes.rows);
    }

    console.log("cards", cards);

    return timelineGames;
  }
}

module.exports = TimelineGame;
