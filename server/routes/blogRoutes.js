const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
} = require("../controllers/blogController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.route("/").get(getAllBlogs).post(protect, createBlog);
router
  .route("/:blogId")
  .get(getBlog)
  .patch(protect, updateBlog)
  .delete(protect, deleteBlog);
router.route("/like/:blogId").patch(protect, likeBlog);
module.exports = router;
