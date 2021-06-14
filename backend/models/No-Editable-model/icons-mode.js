const mongoose = require("mongoose")

const Icon = mongoose.model('Icons',{
    imageName: String,
    url: String,
})
module.exports = Icon;