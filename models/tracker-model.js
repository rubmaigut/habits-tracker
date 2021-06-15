const mongoose = require("mongoose")

const HabitDone = mongoose.model('habitDone',{
    habitId:{
        type: mongoose.Schema.Types,
        ref: 'Habit'
    },
    habitName:{
        type: mongoose.Schema.Types,
        ref: 'Habit'
    },
    isDone: {
        type: Boolean,
        default:false
    },
    userDate: Date,
    notes: String

})
module.exports = HabitDone;