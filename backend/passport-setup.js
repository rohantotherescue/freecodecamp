const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find user in the database
        let user = await User.findOne({ email_id: profile.emails[0].value });
        if (!user) {
          // If user does not exist, create a new user
          user = new User({
            googleId: profile.id,
            email_id: profile.emails[0].value,
            name: profile.displayName,
          });
        //   console.log(user);
          const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(profile.id, salt);
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
