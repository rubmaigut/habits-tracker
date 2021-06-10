const mongoose = require("mongoose")

const Goal = mongoose.model('Goal',{
    unitName: String,
})
module.exports = Goal;