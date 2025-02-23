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

    const populatedComment = await Comment.findById(newComment._id).populate({
      path: "userId",
      select: "fullname",
    });

    res.status(201).json({
      status: "success",
      message: "Comment created successfully",
      data: populatedComment,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createComment };
