const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:blogId").get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
