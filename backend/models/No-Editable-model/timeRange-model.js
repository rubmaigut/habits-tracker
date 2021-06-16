const mongoose = require("mongoose")
const dataTimeRange = require("../../timeranges.json")

const TimeRange = mongoose.model('TimeRange',{
    timeRangeName: String,
})

if (process.env.RESET_DB) {
	const seedTimeDatabase = async () => {
    await TimeRange.deleteMany({})

    dataTimeRange.forEach((timeData) => {
			new TimeRange(timeData).save()
		})
  }

  seedTimeDatabase()
}
module.exports = TimeRange;
  
