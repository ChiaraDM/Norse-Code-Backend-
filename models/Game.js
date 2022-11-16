const db = require("../database/connect");

class Game {
  constructor({ game_id, game_type, game_topic, game_description, game_level, game_subject, game_name, img_path, available, game_route }) {
    this.game_id = game_id;
    this.game_type = game_type;
    this.game_topic = game_topic;
    this.game_description = game_description;
    this.game_level = game_level;
    this.game_subject = game_subject;
    this.game_name = game_name;
    this.img_path = img_path;
    this.available = available;
    this.game_route = game_route;
  }

  static async getAllGames() {
    const response = await db.query("SELECT * FROM game");
    return response.rows.map((g) => new Game(g));
  }
}

module.exports = Game;

// SELECT * FROM game INNER JOIN scene ON game.game_id = scene.game_id INNER JOIN item ON scene.scene_id = item.scene_id WHERE game.game_id = 1
