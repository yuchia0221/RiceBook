const express = require("express");
const router = express.Router();
const passport = require("passport");
const verifyAccess = require("../middleware/verifyAccess");
const loginController = require("../controllers/loginController");
const logoutController = require("../controllers/logoutController");
const registerController = require("../controllers/registerController");
const passwordController = require("../controllers/passwordController");
const googleOAuthController = require("../controllers/googleOAuthController");

router.put("/logout", verifyAccess, logoutController.handleLogout);
router.post("/register", registerController.handleNewUser);
router.post("/login", loginController.handleLogin);
router.get("/isLoggedIn", loginController.checkIfLogin);
router.put("/password", verifyAccess, passwordController.updatePassword);

require("../config/google-passport")(passport);
router.get("/auth/google", passport.authenticate("createNewGoogleAccout", { scope: ["email", "profile"] }));
router.get(
    "/auth/google/callback",
    passport.authenticate("createNewGoogleAccout", { failureRedirect: "/auth/google" }),
    googleOAuthController.handleSuccessfulLogin
);

module.exports = router;
