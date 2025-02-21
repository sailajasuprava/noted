const Blog = require("../models/blogModel");
const AppError = require("../utils/appArror");

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) {
      return next(new AppError("No blogs found", 404));
    }

    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: blogs,
    });
  } catch (err) {
    next(err);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.blogId);

    if (!blog) {
      return next(new AppError("No blog found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const { title, category, content } = req.body;
    const { _id } = req.user;
    const newBlog = await Blog.create({
      title,
      category,
      content,
      author: _id,
    });

    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (err) {
    next(err);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return next(new AppError("No blog found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.blogId);

    if (!blog) {
      return next(new AppError("No blog found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };
