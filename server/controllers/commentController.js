const Comment = require("../models/commentModel");
// const AppError = require("../utils/appArror");

const createComment = async (req, res, next) => {
  try {
    const { comment, blogId } = req.body; //because this is a POST route no need to send blogId in req.params
    const { _id } = req.user;

    const newComment = await Comment.create({
      comment,
      blogId,
      userId: _id,
    });

    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createComment };
