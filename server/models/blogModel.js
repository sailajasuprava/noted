const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      lowercase: true,
      unique: true,
      minlength: [3, "Title must be at least 3 characters long."],
      maxlength: [50, "Title must be less than 50 characters."],
    },
    banner: {
      type: String,
      required: [true, "Banner is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      minlength: [200, "Content must be at least 200 characters long."],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required."],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    numOfLikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

blogSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "blogId",
  localField: "_id",
});

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "fullname",
  });
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
