const db = require("../database/connect");
const Game = require("../models/Game");

class TimelineGame extends Game {
  constructor({ game_id, game_type, game_topic, game_description, cards }) {
    super({ game_id, game_type, game_topic, game_description });
    this.cards = cards;
  }

  // all the timeline games
  // get all the cards for each game, and put it inside the game

  static async getAllTimelineGames() {
    const response = await db.query("SELECT * FROM game WHERE game_type = 'timeline'");
    const timelineGames = response.rows;

    for (let i = 0; i < timelineGames.length; i++) {
      // timelinegames[i] = current timeline game
      const cardRes = await db.query("SELECT * FROM card WHERE game_id = $1", [
        timelineGames[i]["game_id"],
      ]);
      const cards = cardRes.rows;
      timelineGames[i]["cards"] = cards;
    }

    console.log("timelime games: ", timelineGames);

    return timelineGames.map((game) => new TimelineGame(game));
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM game WHERE game_id = $1", [id]);
    const game = response.rows[0];

    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }

    // get that game's cards
    const cardResponse = await db.query("SELECT * FROM card WHERE game_id = $1", [id]);
    const cards = cardResponse.rows;

    game["cards"] = cards;

    return new TimelineGame(game);
  }
}

module.exports = TimelineGame;
