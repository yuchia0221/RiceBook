const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingController");

router.get("/following/:user?", followingController.getFollowing);
router.put("/following/:user", followingController.addFollowing);
router.delete("/following/:user", followingController.deleteFollowing);

module.exports = router;
