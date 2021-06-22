const mongoose = require("mongoose");

const HabitDone = mongoose.model("habitDone", {
  habitId: {
    type: mongoose.Schema.Types,
    ref: "Habit",
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
  }
});
module.exports = HabitDone;
