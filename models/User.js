const db = require("../database/connect");

class User {
    constructor({ user_id, username, user_password, is_admin }) {
        this.id = user_id;
        this.username = username;
        this.password = user_password;
        this.isAdmin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error ("Unable to locate user");
        } else {
            return new User (response.rows[0])
        }
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM user_account WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error ("Unable to locate user");
        } else {
            return new User (response.rows[0]);
        }
    }

    static async createNewUser(data) {
        const { username, password } = data;
        let response = await db.query("INSERT INTO user_account (username, user_password) VALUES ($1, $2) RETURNING user_id", [username, password]);
        const newId = response.rows[0].id;
        const newUser = await User.getOneById(newId);
        return newUser
    }
}

module.exports = User;