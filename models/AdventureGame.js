const db = require('../database/connect');
const Game = require('../models/Game');

class AdventureGame extends Game {
    constructor({game_id, game_type, game_topic, game_description, scenes}) {
        super({game_id, game_type, game_topic, game_description});
        this.scenes = scenes;
    }

    static async getAllAdventureGames() {
        const response = await db.query("SELECT * FROM game WHERE game_type = 'adventure'");
        const adventureGames = response.rows;

        for (let i = 0; i < adventureGames.length; i++) {
            //adventureGames[i] = current adventure game
            // for each one, i want to get that game's scenes and append it
            const sceneResponse = await db.query("SELECT * FROM scene WHERE game_id = $1", [adventureGames[i]["game_id"]]);
            const scenes = sceneResponse.rows;

            // for each games scene, get that scenes items and chats, and append it to the object
            for (let j = 0; j < scenes.length; j++) {
                const sceneItemsResponse = await db.query("SELECT * FROM item WHERE scene_id = $1", [scenes[j]["scene_id"]]);
                const sceneItems = sceneItemsResponse.rows;
                scenes[j]["items"] = sceneItems;

                const sceneChatsResponse = await db.query("SELECT * FROM chat WHERE scene_id = $1", [scenes[j]["scene_id"]]);
                const sceneChats = sceneChatsResponse.rows;
                scenes[j]["chats"] = sceneChats;
            }
            
            adventureGames[i]["scenes"] = scenes;
        }

        console.log(adventureGames);

        return adventureGames.map(game => new AdventureGame(game));
    }

}

module.exports = AdventureGame;