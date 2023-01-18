const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: { type: String, required: true },
    text: { type: String, required: true },
});

const articleSchema = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true },
    image: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Article = mongoose.model("Article", articleSchema);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Article, Comment };
