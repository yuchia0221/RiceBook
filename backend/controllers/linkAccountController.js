const jwt = require("jsonwebtoken");
const User = require("../model/User");
const Profile = require("../model/Profile");
const Following = require("../model/Following");
const { Article, Comment } = require("../model/Article");

const linkWithGoogleAccount = async (req, res) => {
    const cookies = req.cookies;
    const token = cookies.sessionId;
    if (!cookies?.sessionId) return res.sendStatus(204);
    const username = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        return decoded.username;
    });

    const { provider, id, displayName, picture } = req.session.passport.user;
    const googleUsername = `${provider}-${id}`;
    const foundUser = await User.findOne({ username: username }).exec();
    const foundUserProfile = await Profile.findOne({ username: username }).exec();
    const foundUserFollowing = await Following.findOne({ username: username }).exec();
    const foundGoogleUser = await User.findOne({ username: googleUsername }).exec();
    if (!foundUser || !foundUserProfile || !foundUserFollowing) return res.sendStatus(204);
    if (foundGoogleUser) {
        User.findOneAndDelete({ username: googleUsername }).exec();
        const foundGoogleFollowing = await Following.findOneAndDelete({ username: googleUsername }).exec();
        const foundGoogleProfile = await Profile.findOneAndDelete({ username: googleUsername }).exec();
        if (!foundGoogleFollowing) return res.sendStatus(204);
        const googleFollowing = foundGoogleFollowing.following.filter((name) => name !== googleUsername);
        foundUserFollowing.following = Array.from(new Set([...foundUserFollowing.following, ...googleFollowing]));
        foundUserFollowing.save();
        foundUser.googleid = googleUsername;
        foundUser.save();

        if (!foundUserProfile.avatar) foundUserProfile.avatar = foundGoogleProfile.avatar;
        if (!foundUserProfile.displayname) foundUserProfile.displayname = foundGoogleProfile.displayname;
        foundUserProfile.accountLinkWithGoogle = true;
        foundUserProfile.save();
        Article.updateMany({ author: googleUsername }, { author: username }).exec();
        Comment.updateMany({ author: googleUsername }, { author: username }).exec();
    } else {
        if (!foundUserProfile.avatar) foundUserProfile.avatar = picture;
        if (!foundUserProfile.displayname) foundUserProfile.displayname = displayName;
        foundUserProfile.accountLinkWithGoogle = true;
        foundUserProfile.save();
    }

    res.redirect(process.env.FRONTEND_OAUTH_URL);
};

const unlinkGoogleAccount = async (req, res) => {
    const username = req.user;
    const foundUser = await User.findOne({ username });
    const foundUserProfile = await Profile.findOne({ username });
    if (!foundUser || !foundUserProfile)
        return res.status(400).json({ message: "cannot find the linked google account" });

    foundUser.googleid = undefined;
    foundUserProfile.accountLinkWithGoogle = false;
    if (foundUserProfile.avatar?.includes("google")) foundUserProfile.avatar = undefined;
    foundUser.save();
    foundUserProfile.save();

    return res.status(200).json({ foundUser, foundUserProfile });
};

module.exports = { linkWithGoogleAccount, unlinkGoogleAccount };
