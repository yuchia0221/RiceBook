const path = require("path");
const datauri = require("../tools/datauri");
const cloudinary = require("../config/cloudinary");

const Profile = require("../model/Profile");
const Following = require("../model/Following");
const { Article, Comment } = require("../model/Article");

const articlesPerPage = 5;
const uploader = cloudinary.uploader;

const getArticle = async (req, res) => {
    const postid = req.params.id;
    const username = req.user;
    if (!postid) {
        const foundFollowing = await Following.findOne({ username: username });
        if (!foundFollowing.following) return res.json({ articles: [] });
        else {
            const followingList = foundFollowing.following;
            const articles = await Article.find({ author: { $in: followingList } });
            return res.status(200).json({ articles });
        }
    } else {
        try {
            const foundArticle = await Article.findById(postid);
            if (foundArticle) return res.status(200).json({ articles: [foundArticle] });
        } catch {
            const articles = await Article.find({ author: postid });
            return res.status(200).json({ articles });
        }
    }
};

const getArticle_v2 = async (req, res) => {
    const username = req.user;
    const page = req.params.page || 1;
    const foundFollowing = await Following.findOne({ username: username });
    if (!foundFollowing.following) return res.status(204).json({ articles: [] });

    const followingList = foundFollowing.following;
    const articles = await Article.find({ author: { $in: followingList } })
        .sort({ date: "descending" })
        .skip((page - 1) * articlesPerPage)
        .limit(articlesPerPage);
    const foundUsers = await Profile.find({ username: { $in: followingList } });
    const numberOfPages = Math.ceil(
        (await Article.countDocuments({ author: { $in: followingList } })) / articlesPerPage
    );
    profiles = {};
    foundUsers.map((user) => (profiles[user.username] = { displayname: user.displayname, avatar: user.avatar }));
    return res.status(200).json({ articles, profiles, numberOfPages });
};

const getArticleWithFilter_v2 = async (req, res) => {
    const username = req.user;
    const page = req.params.page;
    const filter = req.params.filter;
    const foundFollowing = await Following.findOne({ username: username });
    if (!foundFollowing.following) return res.status(204).json({ articles: [] });

    const followingList = foundFollowing.following;
    const articles = await Article.find({
        $and: [
            { author: { $in: followingList } },
            {
                $or: [{ author: { $regex: filter } }, { title: { $regex: filter } }, { text: { $regex: filter } }],
            },
        ],
    })
        .sort({ date: "descending" })
        .skip((page - 1) * articlesPerPage)
        .limit(articlesPerPage);
    const foundUsers = await Profile.find({ username: { $in: followingList } });
    const numberOfArticles = await Article.countDocuments({
        $and: [
            { author: { $in: followingList } },
            {
                $or: [{ author: { $regex: filter } }, { title: { $regex: filter } }, { text: { $regex: filter } }],
            },
        ],
    });
    const numberOfPages = Math.ceil(numberOfArticles / articlesPerPage);
    profiles = {};
    foundUsers.map((user) => (profiles[user.username] = { displayname: user.displayname, avatar: user.avatar }));
    return res.status(200).json({ articles, profiles, numberOfPages });
};

const updateArticle = async (req, res) => {
    const username = req.user;
    const postid = req.params.id;
    const title = req.body.title;
    const text = req.body.text;
    const commentId = req.body.commentId;

    if (!text) return res.status(400).json("Text should be provided");

    const foundPost = await Article.findById(postid).exec();
    if (!commentId) {
        if (foundPost.author !== username) return res.sendStatus(403);
        foundPost.text = text;
        foundPost.title = title;
        foundPost.save();
        return res.status(200).json({ articles: [foundPost] });
    } else {
        if (commentId === -1) {
            const newComment = await Comment.create({
                author: username,
                text: text,
            });
            foundPost.comments.push(newComment);
            foundPost.save();
            return res.status(201).json(newComment);
        } else {
            const foundComment = await Comment.findById(commentId).exec();
            if (foundComment.author !== username) return res.sendStatus(403);
            else {
                foundComment.text = text;
                foundPost.save();
                return res.status(200).json(foundPost);
            }
        }
    }
};

const createArticle = async (req, res) => {
    const username = req.user;
    const { title, body } = req.body;
    if (!title || !body) return res.sendStatus(400);

    if (req.file) {
        const extensionName = path.extname(req.file.originalname).toString();
        const file = datauri.parser.format(extensionName, req.file.buffer);
        const imageUrl = await uploader
            .upload(file.content, { folder: "posts" })
            .then((result) => {
                return result.url;
            })
            .catch((error) => {
                console.log(error);
            });
        const result = await Article.create({
            author: username,
            title: title,
            text: body,
            date: new Date(),
            image: imageUrl,
        });
        res.status(201).json({ articles: [result] });
    } else {
        const result = await Article.create({
            author: username,
            date: new Date(),
            title: title,
            text: body,
        });
        res.status(201).json({ articles: [result] });
    }
};

module.exports = { getArticle, getArticle_v2, getArticleWithFilter_v2, updateArticle, createArticle };
