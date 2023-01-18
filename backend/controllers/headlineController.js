const Profile = require("../model/Profile");

const getHeadline = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    res.status(200).json({ username: username, headline: foundUser.headline });
};

const updateHeadline = async (req, res) => {
    const username = req.user;
    const headline = req.body.headline;
    if (!headline) return res.status(400).json({ message: "headline should be provided" });

    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    foundUser.headline = headline;
    await foundUser.save();
    res.status(200).json({ username: username, headline: headline });
};

module.exports = { getHeadline, updateHeadline };
