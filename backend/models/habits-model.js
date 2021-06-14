const mongoose = require("mongoose")

const Habit = mongoose.model('habit',{
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: String,
    count: {
        type: Number,
    },
    goal : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
    },
    frequency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frequency'
    },
    timeRange: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeRange'
    },
    message: String,
    icon:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Icon'
    },
    isSelected: {
        type: Boolean,
        default: false
    }
})
module.exports = Habit;