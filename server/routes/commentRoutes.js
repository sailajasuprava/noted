const express = require("express");
const { createComment } = require("../controllers/commentController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").post(protect, createComment);

module.exports = router;
