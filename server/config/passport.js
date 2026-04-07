const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id }); // 1. Check if user already exists with this googleId

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value }); // 2. If not, check if a user exists with the same email

          if (user) {
            user.googleId = profile.id; // Link Google ID to existing email account
            await user.save({ validateBeforeSave: false });
          } else {
            // 3. Create new user
            user = await User.create({
              fullname: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              avatar: profile.photos[0].value,
            });
          }
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

module.exports = passport;
