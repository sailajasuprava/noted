const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Fullname is a required field."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is a required field."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    avatar: {
      type: String,
      default: "https://i.pravatar.cc/150?u=seraphina",
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must have atleast 8 characters."],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
