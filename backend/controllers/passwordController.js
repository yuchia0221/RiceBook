const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const updatePassword = async (req, res) => {
    const username = req.user;
    const password = req.body.password;
    const foundUser = await User.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    foundUser.password = hashedPassword;
    await foundUser.save();
    res.status(200).json({ username: username, result: "success" });
};

module.exports = { updatePassword };
