const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./models/user-model");

const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "874062991058-f543qaffaoq1hpjo230pnktqq08osq1l.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "8TDpHZStQiQDKVQazex1NQId";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
      "https://habit-tracker-mr.herokuapp.com/auth/google/callback",
      //"http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      User.findOne({
        $or: [{ googleId: profile.id }, { email: profile.email }],
      }).then((currentUser) => {
        if (currentUser) {
          return done(null,currentUser, profile);
        } else {
          new User({
            googleId: profile.id,
            email: profile.email,
            username: profile.displayName,
            picture: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              done(null, profile);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
