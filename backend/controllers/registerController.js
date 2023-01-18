const User = require("../model/User");
const Profile = require("../model/Profile");
const Following = require("../model/Following");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const handleNewUser = async (req, res) => {
    const { username, displayname, email, phoneNumber, zipcode, dob, password } = req.body;
    if (!username || !password || !email || !dob || !zipcode || !phoneNumber) return res.sendStatus(400);

    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({
            username: username,
            password: hashedPassword,
        });
        await Profile.create({
            username: username,
            displayname: displayname,
            email: email,
            phoneNumber: phoneNumber,
            zipcode: zipcode,
            dob: new Date(parseInt(dob)),
            isOAuth: false,
            accountLinkWithGoogle: false,
        });
        await Following.create({ username: username, following: [username] });
        const sessionId = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "7 days",
        });
        res.cookie("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(201).json({ result: "success", username: username });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleNewUser };
