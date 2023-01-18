const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const headlineController = require("../controllers/headlineController");
const emailController = require("../controllers/emailController");
const zipcodeController = require("../controllers/zipcodeController");
const dobController = require("../controllers/dobController");
const avatarController = require("../controllers/avatarController");
const displayNameController = require("../controllers/displayNameController");
const multer = require("../middleware/multer");

router.get("/profile/:user?", profileController.getProfile);
router.put("/profile", profileController.updateProfile);

router.get("/displayname/:user?", displayNameController.getDisplayName);

router.get("/headline/:user?", headlineController.getHeadline);
router.put("/headline/", headlineController.updateHeadline);

router.get("/email/:user?", emailController.getEmail);
router.put("/email/", emailController.updateEmail);

router.get("/zipcode/:user?", zipcodeController.getZipCode);
router.put("/zipcode/", zipcodeController.updateZipcode);

router.get("/dob/:user?", dobController.getDateOfBirth);

router.get("/avatar/:user?", avatarController.getAvatar);
router.put("/avatar/", multer, avatarController.updateAvatar);

module.exports = router;
