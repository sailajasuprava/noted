const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [50, "Title must be less than 50 characters long."],
    },
    // banner: {
    //   type: String,
    //   required: [true, "Banner is required"],
    // },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      minlength: [50, "Content must be at least 50 characters long."],
    },
    // summary: {
    //   type: String,
    //   required: [true, "Summary is required."],
    //   maxlength: [200, "Summary must be less than 200 characters."],
    // },
    // tags: {
    //   type: [String],
    // },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required."],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
