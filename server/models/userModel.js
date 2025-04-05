const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "fullname is a required field."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is a required field."],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must have atleast 8 characters."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password."],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords are not the same.",
      },
    },
  },
  {
    timestamps: true,
  }
);

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
