require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const blogRouter = require("./routes/blogRoutes");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appArror");
const { connectDB } = require("./lib/db");

const port = process.env.PORT || 3000;
const corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
