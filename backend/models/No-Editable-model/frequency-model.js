const mongoose = require("mongoose")

const Frequency = mongoose.model('frequency',{
    frequencyName: String,
})
module.exports = Frequency;