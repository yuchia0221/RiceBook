const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Profile = require("../model/Profile");
const Following = require("../model/Following");
const saltRounds = 10;

const handleSuccessfulLogin = async (req, res) => {
    const { provider, id, displayName, email, picture } = req.session.passport.user;
    const username = `${provider}-${id}`;
    const password = id + req.sessionID;
    const foundGoogleAccount = await User.findOne({ googleid: username }).exec();
    if (foundGoogleAccount) {
        const sessionId = jwt.sign({ username: foundGoogleAccount.username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7 days",
        });
        req.app.sessions.add(sessionId);
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(process.env.FRONTEND_OAUTH_URL);
    } else {
        const foundUser = await User.findOne({ username: username }).exec();
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

        if (!foundUser) {
            try {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                await User.create({
                    username: username,
                    password: hashedPassword,
                });
                await Profile.create({
                    username: username,
                    displayname: displayName,
                    email: email,
                    dob: new Date(),
                    avatar: picture,
                    isOAuth: true,
                    accountLinkWithGoogle: false,
                });
                await Following.create({ username: username, following: [username] });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        }
        res.redirect(process.env.FRONTEND_OAUTH_URL);
    }
};

module.exports = { handleSuccessfulLogin };
