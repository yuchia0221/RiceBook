const path = require("path");
const cloudinary = require("../config/cloudinary");
const datauri = require("../tools/datauri");
const Profile = require("../model/Profile");
const uploader = cloudinary.uploader;

const getAvatar = async (req, res) => {
    const username = req.params.user || req.user;
    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    res.status(200).json({ username: username, avatar: foundUser.avatar });
};

const updateAvatar = async (req, res) => {
    const username = req.user;
    if (!req.file) return res.status(400).json({ message: "avatar url link should be provided" });

    const foundUser = await Profile.findOne({ username: username }).exec();
    if (!foundUser) return res.sendStatus(204);

    const extensionName = path.extname(req.file.originalname).toString();
    const file = datauri.parser.format(extensionName, req.file.buffer);
    const imageUrl = await uploader
        .upload(file.content, { folder: "avatar" })
        .then((result) => {
            return result.url;
        })
        .catch((error) => {
            console.log(error);
        });

    foundUser.avatar = imageUrl;
    await foundUser.save();
    res.status(200).json({ username: username, avatar: imageUrl });
};

module.exports = { getAvatar, updateAvatar };
