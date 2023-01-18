const { Comment } = require("../model/Article");

const getComment = async (req, res) => {
    const commentId = req.params.id;
    if (!commentId) return res.sendStatus(400);
    const foundComment = await Comment.findById(commentId).exec();
    if (!foundComment) return res.sendStatus(204);

    return res.status(200).json(foundComment);
};

const updateComment = async (req, res) => {
    const username = req.user;
    const text = req.body.text;
    const commentId = req.params.id;
    if (!commentId) return res.sendStatus(400);

    const foundComment = await Comment.findById(commentId).exec();
    if (!foundComment) return res.sendStatus(204);
    if (foundComment.author !== username) return res.sendStatus(403);

    foundComment.text = text;
    foundComment.save();

    return res.status(200).json(foundComment);
};

module.exports = { getComment, updateComment };
