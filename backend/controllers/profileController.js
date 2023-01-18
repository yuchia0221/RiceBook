const User = require("../model/User");
const Profile = require("../model/Profile");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getProfile = async (req, res) => {
    const username = req.params.user || req.user;
    const foundProfile = await Profile.findOne({ username: username }).exec();
    if (!foundProfile) return res.sendStatus(204);
    if (foundProfile.dob) {
        const dob = foundProfile.dob.getTime();
        res.status(200).json({ ...foundProfile.toJSON(), dob });
    } else {
        res.status(200).json({ ...foundProfile.toJSON() });
    }
};

const updateProfile = async (req, res) => {
    const username = req.user;
    const { displayname, email, phoneNumber, zipcode, password } = req.body;
    if (!email || !phoneNumber || !zipcode) return res.sendStatus(400);

    if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.findOneAndUpdate({ username: username }, { password: hashedPassword });
    }
    await Profile.findOneAndUpdate(
        { username: username },
        { email: email, displayname: displayname, email: email, phoneNumber: phoneNumber, zipcode: zipcode }
    ).exec();

    res.sendStatus(200);
};

module.exports = { getProfile, updateProfile };
