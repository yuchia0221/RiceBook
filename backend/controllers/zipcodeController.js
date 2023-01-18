const Profile = require("../model/Profile");

const getZipCode = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    res.status(200).json({ username: username, zipcode: foundUser.zipcode });
};

const updateZipcode = async (req, res) => {
    const username = req.user;
    const zipcode = req.body.zipcode;
    if (!zipcode) return res.status(400).json({ message: "zipcode should be provided" });

    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    foundUser.zipcode = zipcode;
    await foundUser.save();
    res.status(200).json({ username: username, zipcode: zipcode });
};

module.exports = { getZipCode, updateZipcode };
