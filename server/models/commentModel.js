const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment is required."],
      maxlength: [200, "Comment must be less than 200 characters."],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId is required."],
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: [true, "BlogId is required."],
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "fullname",
  });
  next();
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
