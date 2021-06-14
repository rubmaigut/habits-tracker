require("./auth-setup");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bycrypt = require("bcrypt");
const passport = require("passport");
const mongoose = require("mongoose");

const User = require("./models/user-model");
const Habit = require("./models/habits-model");

const Category = require("./models/No-Editable-model/category-model");
const Goal = require("./models/No-Editable-model/goal-model");
const Frequency = require("./models/No-Editable-model/frequency-model");
const TimeRange = require("./models/No-Editable-model/timeRange-model");
const Icon = require("./models/No-Editable-model/icons-mode");

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

const publicDir = require("path").join(__dirname, "/public/assets");

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/icon-directory", express.static(publicDir));

/**** USER MODEL *****/
//google auth feature
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);
app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
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
    res.status(400).json(error);
  }
});
/**** USER MODEL - END *****/

/**** NO EDITABLE MODEL  ****/
// CATEGORY
app.post("/setup/category", async (req, res) => {
  const { categoryName, description } = req.body;
  try {
    const category = await new Category({
      categoryName,
      description,
    }).save();
    res.json(category);
  } catch (error) {
    res.status(200).json(error);
  }
});

// GOALS
app.post("/setup/goal", async (req, res) => {
  const { unitName } = req.body;
  try {
    const goal = await new Goal({ unitName }).save();
    res.json(goal);
  } catch (error) {
    res.status(200).json(error);
  }
});
// FREQUENCY
app.post("/setup/frequency", async (req, res) => {
  const { frequencyName } = req.body;
  try {
    const frequency = await new Frequency({ frequencyName }).save();
    res.json(frequency);
  } catch (error) {
    res.status(200).json(error);
  }
});

// TIME RANGE
app.post("/setup/timeRange", async (req, res) => {
  const { timeRangeName } = req.body;
  try {
    const timeRange = await new TimeRange({ timeRangeName }).save();
    res.json(timeRange);
  } catch (error) {
    res.status(400).json(error);
  }
});

//ICONS
app.post("/setup/icons", async (req, res) => {
  const { imageName, url } = req.body;
  try {
    const icons = await new Icon({
      imageName,
      url,
    }).save();
    res.json(icons);
  } catch (error) {
    res.status(400).json(error);
  }
});
/**** NO EDITABLE MODEL - END ****/

/**** HABIT MODEL  ****/
app.post("/habits", async (req, res) => {
  const { name, message, count } = req.body;

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
        category: selectCategory._id,
        name,
        count,
        goal: selectGoal._id,
        frequency: selectFrequency._id,
        timeRange: selectTimeRange._id,
        icon: selectIcon._id,
        message,
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

app.put("/habits/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, message, count } = req.body;
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
        category: selectCategory._id,
        name,
        count,
        goal: selectGoal._id,
        frequency: selectFrequency._id,
        timeRange: selectTimeRange._id,
        icon: selectIcon._id,
        message,
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
/**** HABIT MODEL - END ****/

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
