require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const crypto = require("crypto");
const bycrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");

const User = require("./models/user-model");
const Habit = require("./models/habits-model");
const HabitDone = require("./models/tracker-model");
const DefaulHabit = require("./models//No-Editable-model/Default-habits-model");
const Icon = require("./models/No-Editable-model/icons-mode");
const Category = require("./models/No-Editable-model/category-model");
const Goal = require("./models/No-Editable-model/goal-model");
const Frequency = require("./models/No-Editable-model/frequency-model");
const TimeRange = require("./models/No-Editable-model/timeRange-model");

require("./models/No-Editable-model/category-model");
require("./models/No-Editable-model/goal-model");
require("./models/No-Editable-model/frequency-model");
require("./models/No-Editable-model/timeRange-model");
require("./auth-setup");

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/habit-tracker";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

//Global Variables
const successLoginUrl = `${process.env.FE_URL}/login/success`;
const errorLoginUrl = `${process.env.FE_URL}/login/error`;

const isLoggedIn = (req, res, next) => {
  const { headers } = req;

  req.user || headers.authorization
    ? next()
    : res.sendStatus(401).send("You must be logged in");
};
const publicDir = require("path").join(__dirname, "/public/assets");

const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString("hex");
};

// Add middlewares to enable cors and json body parsing
app.use(cors({ origin: `${process.env.FE_URL}`, credentials: true }));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/icon-directory", express.static(publicDir));

/**** USER MODEL *****/
//google auth feature
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: successLoginUrl,
    failureRedirect: errorLoginUrl,
    failureMessage: "Cannot login to Google, please try again",
  }),
  (req, res) => {
    res.send(`Thank you for Signing in! ${req.user.displayName}`);
  }
);

app.get("/home", isLoggedIn, async (req, res) => {
  res.json(req.user);
});

//create user manually
app.post("/user/new/signup", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const salt = bycrypt.genSaltSync();

    const googleIdFake = encrypt(email);

    const newUser = await new User({
      email,
      username,
      password: bycrypt.hashSync(password, salt),
      googleId: googleIdFake,
    }).save();
    res.json({
      userId: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
});
/**** USER MODEL - END *****/

/**** HABIT MODEL  ****/
app.get("/default-habits", isLoggedIn, async (req, res) => {
  const defaultHabits = await DefaulHabit.find({});
  res.json(defaultHabits);
});

app.get("/default-habits/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const defaultHabits = await DefaulHabit.findById(id);
  res.json(defaultHabits);
});

app.get("/habit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const defaultHabits = await Habit.findById(id);
  res.json(defaultHabits);
});

app.get("/habits/user", isLoggedIn, async (req, res) => {
  const {
    headers: { authorization },
  } = req;

  const user = await User.findOne({ accessToken: authorization });

  const habitsByuser = await Habit.find({ userId: user._id });

  res.json(habitsByuser);
});

app.post("/habits", isLoggedIn, async (req, res) => {
  const {
    body: { name, message, count, startedDate, endingDate },
    headers,
  } = req;

  try {
    const user = await User.findOne({
      accessToken: headers.authorization,
    });
    const selectCategory = await Category.findOne({
      categoryName: req.body.category,
    });
    const selectGoal = await Goal.findOne({ symbol: req.body.goal });

    const selectFrequency = await Frequency.findOne({
      frequencyName: req.body.frequency,
    });
    const selectTimeRange = await TimeRange.findOne({
      timeRangeName: req.body.timeRange,
    });
    const selectIcon = await Icon.findOne({ imageName: req.body.icon });
    if (
      selectCategory.categoryName &&
      selectGoal.unitName &&
      selectFrequency.frequencyName &&
      selectTimeRange.timeRangeName &&
      user
    ) {
      await new Habit({
        category: selectCategory,
        name,
        count,
        goal: selectGoal.unitName,
        frequency: selectFrequency.frequencyName,
        timeRange: selectTimeRange.timeRangeName,
        icon: selectIcon,
        message,
        startedDate,
        endingDate,
        userId: user._id,
      }).save((error) => {
        Habit.findOne({})
          .sort({ _id: -1 })
          .populate("habits")
          .exec((error, habit) => {
            res.json(habit);
            //console.log('populate',JSON.stringify(habit, null,'\t'))
          });
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/habits/update/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { name, message, count, startedDate, endingDate, isSelected } =
    req.body;
  const options = { returnNewDocument: true, returnOriginal: false };

  try {
    const selectCategory = await Category.findOne({
      categoryName: req.body.category,
    });
    const selectGoal = await Goal.findOne({ unitName: req.body.goal });
    const selectFrequency = await Frequency.findOne({
      frequencyName: req.body.frequency,
    });
    const selectTimeRange = await TimeRange.findOne({
      timeRangeName: req.body.timeRange,
    });
    const selectIcon = await Icon.findOne({ imageName: req.body.icon });

    const update = {
      $set: {
        category: selectCategory,
        name,
        count,
        goal: selectGoal.unitName,
        frequency: selectFrequency.frequencyName,
        timeRange: selectTimeRange.timeRangeName,
        icon: selectIcon,
        message,
        startedDate,
        endingDate,
        isSelected,
      },
    };

    if (
      selectCategory.categoryName &&
      selectGoal.unitName &&
      selectFrequency.frequencyName &&
      selectTimeRange.timeRangeName
    ) {
      await Habit.findOneAndUpdate(id, update, options).then(() => {
        res.json(update);
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/habit/done/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { isDone, userDate, notes } = req.body;

  const habitSelected = await Habit.findOne({ _id: id });

  if (habitSelected.isSelected === true) {
    await new HabitDone({
      habitId: habitSelected._id,
      habitName: habitSelected.name,
      isDone,
      userDate,
      notes,
    })
      .save()
      .populate("habits");
  }
});

/**** HABIT MODEL - END ****/

/****  GET ICON LIST ****/

app.get("/icons", async (req, res) => {
  try {
    const icon = await Icon.find({});
    res.send(icon);
  } catch (error) {
    res.status(400).json(error);
  }
});
/****  END GET ICON LIST ****/

/****  GET DEFAULT DATA *****/
app.get("/setup/category", async (req, res) => {
  try {
    const category = await Category.find({});
    res.send(category);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/setup/goal", async (req, res) => {
  try {
    const goal = await Goal.find({});
    res.send(goal);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/setup/frequency", async (req, res) => {
  try {
    const frequency = await Frequency.find({});
    res.send(frequency);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/setup/timeRange", async (req, res) => {
  try {
    const timeRange = await TimeRange.find({});
    res.send(timeRange);
  } catch (error) {
    res.status(400).json(error);
  }
});
/****  END GET DEFAULT DATA *****/

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
