const mongoose = require("mongoose");

const HabitDone = mongoose.model("habitDone", {
  habitId: {
    type: mongoose.Schema.Types,
    ref: "Habit",
  },
  userId: {
    type: mongoose.Schema.Types,
    ref: "User",
  },
  countDone: Number,
  goalDone: {
    type: mongoose.Schema.Types,
    ref: "Goal",
  },
  dateDone: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDone: {
    type: Boolean
  }
});
module.exports = HabitDone;
