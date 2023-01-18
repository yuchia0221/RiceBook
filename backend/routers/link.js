const express = require("express");
const router = express.Router();
const passport = require("passport");
const linkAccountController = require("../controllers/linkAccountController");

router.delete("/link/google", linkAccountController.unlinkGoogleAccount);
require("../config/google-linking")(passport);
router.get("/link/google", passport.authenticate("linkGoogleAccount", { scope: ["profile"] }));
router.get(
    "/link/google/callback",
    passport.authenticate("linkGoogleAccount", { failureRedirect: "/link/google" }),
    linkAccountController.linkWithGoogleAccount
);

https: module.exports = router;
