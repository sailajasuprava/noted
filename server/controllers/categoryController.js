const Category = require("../models/categoryModel");
const AppError = require("../utils/appArror");

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return next(new AppError("No categories found", 404));
    }

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.body;

    const newCategory = await Category.create({
      categoryName,
    });

    res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategories, createCategory };
