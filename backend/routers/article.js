const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const articleController = require("../controllers/articleController");
const commentController = require("../controllers/commentController");

router.get("/comments/:id", commentController.getComment);
router.put("/comments/:id", commentController.updateComment);

router.get("/articles/:id?", articleController.getArticle);
router.get("/v2/articles/:page&:filter", articleController.getArticleWithFilter_v2);
router.get("/v2/articles/:page?", articleController.getArticle_v2);
router.put("/articles/:id", articleController.updateArticle);
router.post("/article", multer, articleController.createArticle);

module.exports = router;
