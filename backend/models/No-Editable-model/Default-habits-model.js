const mongoose = require("mongoose")
const dataDefaultHabits = require("../../DefaultHabits.json")

const DefaulHabit = mongoose.model('DefaultHabit',{
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
    startedDate:{
        type: Date,
        default: new Date
    },
    endingDate: Date,
})

if (process.env.RESET_DB) {
	const seedDefaultHabitDatabase = async () => {
    await DefaulHabit.deleteMany({})

    dataDefaultHabits.forEach((habitsData) => {
			new DefaulHabit(habitsData).save()
		})
  }

  seedDefaultHabitDatabase()
} 
module.exports = DefaulHabit;





