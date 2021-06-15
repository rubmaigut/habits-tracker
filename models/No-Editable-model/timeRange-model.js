const mongoose = require("mongoose")

const TimeRange = mongoose.model('TimeRange',{
    timeRangeName: String,
})
module.exports = TimeRange;
  
