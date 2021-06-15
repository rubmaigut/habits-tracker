const mongoose = require("mongoose")

const Habit = mongoose.model('habit',{
    category:{
        type: mongoose.Schema.Types,
        ref: 'Category'
    },
    name: String,
    count: {
        type: Number,
    },
    goal : {
        type: mongoose.Schema.Types,
        ref: 'Goal'
    },
    frequency: {
        type: mongoose.Schema.Types,
        ref: 'frequency'
    },
    timeRange: {
        type: mongoose.Schema.Types,
        ref: 'TimeRange'
    },
    message: String,
    icon:{
        type: mongoose.Schema.Types,
        ref: 'Icon'
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    startedDate: Date,
    endingDate: Date
})
module.exports = Habit;



