const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("./models/user-model")

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ||"874062991058-f543qaffaoq1hpjo230pnktqq08osq1l.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "8TDpHZStQiQDKVQazex1NQId";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback",
  passReqToCallback: true,
},
(request, accessToken, refreshToken, profile, done) =>{
   User.findOne({$or: [{googleId: profile.id},{email: profile.email}]}).then((currentUser)=>{
        if(currentUser){
            return done(null, profile);
        }else{
            new User({
                googleId : profile.id,
                email : profile.email,
                username : profile.displayName
            }).save().then((newUser)=>{done(null, profile)})
        }
    })
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
}); 
