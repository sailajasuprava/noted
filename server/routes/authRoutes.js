const express = require("express");
const passport = require("passport");

const {
  signUp,
  logIn,
  logOut,
  protect,
  getProfile,
  googleAuthSuccess,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/profile", protect, getProfile);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=OAuth failed`,
  }),
  googleAuthSuccess,
);

module.exports = router;
