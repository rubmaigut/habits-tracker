const express = require('express')
const session = require('express-session');
const cors = require('cors')
const mongoose = require('mongoose')
const bycrypt = require('bcrypt')
const passport = require('passport');
const User = require("./models/user-model")
require('./auth-setup')

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/habit-tracker";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}; 

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/****  GOOGLE AUTH FEATURE*****/
app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
})

 app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
)); 

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
); 
app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

//create user manually
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const salt = bycrypt.genSaltSync();

    const newUser = await new User({
      email,
      username,
      password: bycrypt.hashSync(password, salt),
    }).save();

    res.json({
      userId: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});
/****   END GOOGLE AUTH FEATURE*****/

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
