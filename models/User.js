const db = require("../database/connect");

class User {
    constructor({ user_id, username, user_password, is_admin }) {
        this.user_id = user_id;
        this.username = username;
        this.user_password = user_password;
        this.is_admin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error ("Unable to locate user")
        } else {
            return new User (response.rows[0])
        }
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows != 1) {
            throw new Error ("Unable to locate user")
        } else {
            return new User (response.rows[0])
        }
    }

    static async createNewUser(data) {
        const { username, user_password } = data;
        console.log(username, user_password)
        let response = await db.query("INSERT INTO user_account (username, user_password) VALUES ($1, $2) RETURNING user_id", [username, user_password]);
        const newId = response.rows[0].user_id;
        const newUser = await User.getOneById(newId);
        return newUser
    }
}

module.exports = User;