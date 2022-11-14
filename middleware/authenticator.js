import Token from "../models/Token";

function authenticator(req, res, next) {

    try {

        const userToken = req.headers["authorization"];
        console.log("userToken:", userToken);
        if (!userToken) {
            throw new Error("User not authenticated")
        } else {
            const validToken = Token.getOneByToken(userToken);
            next()
        }

    } catch (err) {
        res.status(403).json({"error" : err.message});
    }
}

module.exports = authenticator;