const Profile = require("../model/Profile");

const getEmail = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    res.status(200).json({ username: username, email: foundUser.email });
};

const updateEmail = async (req, res) => {
    const username = req.user;
    const email = req.body.email;
    if (!email) return res.status(400).json({ message: "username should be provided" });

    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    foundUser.email = email;
    await foundUser.save();
    res.status(200).json({ username: username, email: email });
};

module.exports = { getEmail, updateEmail };
