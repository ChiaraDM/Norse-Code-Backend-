const bcrypt = require("bcrypt");
const User = require("../models/User");
const Token = require("../models/Token");

async function register (req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(parseInt(process.env.BCYPT_SALT_ROUNDS)); 
        
        data["user_password"] = await bcrypt.hash(data["user_password"], salt);
        const result = await User.createNewUser(data);
        console.log('data', data, "salt", salt)
        res.status(201).send(result);

    } catch (err) {

        res.status(400).json({"error": err.message});
    }
};

async function show (req, res) {

    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);

        res.send(user);
    } catch (err) {

        res.status(404).json({"error": err.message});
    }
}

async function login (req, res) {

    try {
        const user = await User.getOneByUsername(req.body.username);
        const authenticated = await bcrypt.compare(req.body.password, user["password"]);
        
        if (!authenticated) {
            throw new Error("Incorrect credentials");
        } else {
            const token = await Token.create(user["id"]);
            console.log(token);

            res.cookie("norseUser", token.token, {maxAge: 3600000, sameSite: 'None', secure: true});

            res.status(200).json({authenticate: true, token: token.token })
        }

    } catch (err) {
        res.status(403).json({"error": err.message})
    }
}

module.exports = { register, show, login };