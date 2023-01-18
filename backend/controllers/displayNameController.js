const Profile = require("../model/Profile");

const getDisplayName = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Profile.findOne({ uswername: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    res.status(200).json({ username: username, displayname: foundUser.displayname });
};

module.exports = { getDisplayName };
