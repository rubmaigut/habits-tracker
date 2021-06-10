const mongoose = require("mongoose")

const Category = mongoose.model('category',{
    categoryName: String,
    description: String
})
module.exports = Category;





