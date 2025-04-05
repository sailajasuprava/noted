const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const commentRouter = require("./routes/commentRoutes");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appArror");

const corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

//MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: "4Mb" }));
app.use(cookieParser());
app.use(mongoSanitize());

//ROUTES
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);

//CUSTOM ERROR MESSAGE FOR UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
