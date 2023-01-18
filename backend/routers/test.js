const express = require("express");
const router = express.Router();
const testingCleanUpController = require("../controllers/testingCleanUpController");

router.post("/cleanup", testingCleanUpController.handleCleanUp);

module.exports = router;
