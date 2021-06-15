const mongoose = require("mongoose")
const dataCategory = require("../../categories.json")

const Category = mongoose.model('category',{
    categoryName: String,
    description: String
})

if (process.env.RESET_DB) {
	const seedCategoryDatabase = async () => {
    await Category.deleteMany({})

    dataCategory.forEach((categoryData) => {
			new Category(categoryData).save()
		})
  }

  seedCategoryDatabase()
}


module.exports = Category;





