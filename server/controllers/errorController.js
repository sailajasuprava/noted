const AppError = require("../utils/appArror");

const globalErrorHandler = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}`;
    err = new AppError(message, 400);
  }
  if (err.code === 11000) {
    const field = err.keyValue.email; //where unique:true #fff
    err = new AppError(`Duplicate field value: ${field}`, 400);
  }
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((el) => el.message);
    err = new AppError(`Invalid input data: ${messages.join(" ")}`, 400);
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    err = new AppError("Please log in again", 401);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};

module.exports = globalErrorHandler;
