const db = require("../database/connect");

class Game {
  constructor({ game_id, game_type, game_topic, game_description }) {
    this.game_id = game_id;
    this.game_type = game_type;
    this.game_topic = game_topic;
    this.game_description = game_description;
  }

  static async getAllGames() {
    const response = await db.query("SELECT * FROM game");
    return response.rows.map((g) => new Game(g));
  }
}

module.exports = Game;

// SELECT * FROM game INNER JOIN scene ON game.game_id = scene.game_id INNER JOIN item ON scene.scene_id = item.scene_id WHERE game.game_id = 1
