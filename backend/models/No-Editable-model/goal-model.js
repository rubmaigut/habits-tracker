const mongoose = require("mongoose")
const dataGoal = require("../../categories.json")

const Goal = mongoose.model('Goal',{
    unitName: String,
    symbol: String
})

if (process.env.RESET_DB) {
	const seedGoalDatabase = async () => {
    await Goal.deleteMany({})

    dataGoal.forEach((goalData) => {
			new Goal(goalData).save()
		})
  }

  seedGoalDatabase()
}
module.exports = Goal;
