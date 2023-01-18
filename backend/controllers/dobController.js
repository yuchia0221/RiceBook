const Profile = require("../model/Profile");

const getDateOfBirth = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    const milliseconds = foundUser.dob.getTime();
    res.status(200).json({ username: username, dob: milliseconds });
};

module.exports = { getDateOfBirth };
