const User = require("../model/User");
const Profile = require("../model/Profile");
const Following = require("../model/Following");
const { Article } = require("../model/Article");

const handleCleanUp = async (req, res) => {
    const username = req.body.username;
    await User.findOneAndDelete({ username: username });
    await Profile.findOneAndDelete({ username: username });
    await Following.findOneAndDelete({ username: username });
    await Article.findOneAndDelete({ author: username });
    return res.sendStatus(200);
};

module.exports = { handleCleanUp };
