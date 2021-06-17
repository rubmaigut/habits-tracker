const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bycrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");

const User = require("./models/user-model");
const Habit = require("./models/habits-model");
const HabitDone = require("./models/tracker-model");

require("./models/No-Editable-model/category-model");
require("./models/No-Editable-model/goal-model");
require("./models/No-Editable-model/frequency-model");
require("./models/No-Editable-model/timeRange-model");

const Icon = require("./models/No-Editable-model/icons-mode");

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

const successLoginUrl = "http://localhost:3000/login/success"
const errorLoginUrl = "http://localhost:3000/login/error"

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401).send('You must be logged in');
};
const publicDir = require("path").join(__dirname, "/public/assets");

// Add middlewares to enable cors and json body parsing
app.use(cors({origin: "https://cranky-mcnulty-20270e.netlify.app/", credentials: true}));
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
  (req, res)=>{
    res.send(`Thank you for Signing in! ${req.user.displayName}`)
  }
);

app.get("/home",isLoggedIn, async(req, res)=>{
  res.json(req.user)
})

//create user manually
app.post("/user/new/signup", async (req, res) => {
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
    res.status(400).json(error);
  }
});
/**** USER MODEL - END *****/

/**** HABIT MODEL  ****/
app.post("/habits", isLoggedIn, async (req, res) => {
  const { name, message, count, startedDate, endingDate } = req.body;

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
    if (
      selectCategory.categoryName &&
      selectGoal.unitName &&
      selectFrequency.frequencyName &&
      selectTimeRange.timeRangeName
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

  console.log("validation", habitSelected.isSelected);
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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
