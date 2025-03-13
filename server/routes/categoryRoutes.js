const express = require("express");
const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/").get(getAllCategories).post(createCategory);

module.exports = router;
