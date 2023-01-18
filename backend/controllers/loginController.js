const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Username and password are required." });

    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(401);

    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (passwordMatch) {
        const sessionId = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7 days",
        });
        req.app.sessions.add(sessionId);
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ username: username, result: "success" });
    } else {
        res.sendStatus(401);
    }
};

const checkIfLogin = async (req, res) => {
    const token = req.cookies.sessionId;
    if (!req.app.sessions.has(token)) return res.sendStatus(401);

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) return res.sendStatus(204);
            else return res.sendStatus(200);
        });
    } else return res.sendStatus(203);
};

module.exports = { handleLogin, checkIfLogin };
