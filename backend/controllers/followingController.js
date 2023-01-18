const User = require("../model/User");
const Profile = require("../model/Profile");
const Following = require("../model/Following");

const getFollowing = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Following.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    res.send({ username: username, following: foundUser.following });
};

const addFollowing = async (req, res) => {
    const username = req.user;
    const newFollower = req.params.user;
    if (!newFollower) return res.status(400).json({ message: "username should be provided" });

    const following = await User.findOne({ username: newFollower }).exec();
    const foundUser = await Following.findOne({ username: username }).exec();
    const followingUser = await Profile.findOne({ username: newFollower }).exec();
    if (!foundUser || !following || !followingUser) return res.sendStatus(204);
    if (followingUser.isOAuth) return res.sendStatus(205);

    if (!foundUser.following.includes(newFollower)) {
        foundUser.following.push(newFollower);
        foundUser.save();
    }
    res.status(200).json({ username: username, following: foundUser.following, newFollowing: followingUser });
};

const deleteFollowing = async (req, res) => {
    const username = req.user;
    const removeFollower = req.params.user;
    if (!removeFollower) return res.status(400).json({ message: "username should be provided" });

    const foundUser = await Following.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    foundUser.following = foundUser.following.filter((follower) => follower != removeFollower);
    foundUser.save();
    res.status(200).json({ username: username, following: foundUser.following });
};

module.exports = { getFollowing, addFollowing, deleteFollowing };
