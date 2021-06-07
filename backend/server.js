import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bycrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/habit-tracker";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

/***** SET SCHEMA   ******/
//Email validator
const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};
// Create new users model
const User = mongoose.model("Users", {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});
/*****  END SET SCHEMA   ******/

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
})