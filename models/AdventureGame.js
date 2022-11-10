const db = require('../database/connect');
const Game = require('../models/Game');

class AdventureGame extends Game {
    constructor({game_id, game_type, game_topic, game_description, scenes}) {
        super(game_id, game_type, game_topic, game_description);
        this.scenes = scenes;
    }

    // all the adventure games
    // get all the scenes for each game, and put it inside the game
    // for all the scenes, get all the items and chats for that scene

    static async getAllAdventureGames() {
        const response = await db.query("SELECT * FROM game WHERE game_type = 'adventure'");
        const adventureGames = response.rows;

        const scenes = []
        for (let i = 0; i < adventureGames.length; i++) {
            const sceneRes = await db.query("SELECT * FROM scene WHERE game_id = $1", [i+1]);
            scenes.push(sceneRes.rows);
        }

        const sceneItems = []
        for (let i = 0; i < scenes.length; i++){
            const sceneItemsRes = await db.query("SELECT * FROM item WHERE scene_id = $1", [i+1]) 
            console.log(sceneItemsRes.rows);
            sceneItems.push(sceneItemsRes.rows)
        }

        console.log("scenes", scenes);
        console.log("sceneItems", sceneItems);

        for (let i = 0; i < sceneItems.length; i++) {
            for(let j = 0; i < scenes[i].length; i++) {
                scenes[i][j]["items"] = sceneItems[i]
            }
        }

        for (let i = 0; i < scenes.length; i++) {
            adventureGames[i]["scenes"] = scenes[i];
        }
        
        return adventureGames
    }
}

module.exports = AdventureGame;