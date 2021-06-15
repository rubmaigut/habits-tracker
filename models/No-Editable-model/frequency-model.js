const mongoose = require("mongoose")
const dataFrequency = require("../../frequencies.json")

const Frequency = mongoose.model('frequency',{
    frequencyName: String,
})
if (process.env.RESET_DB) {
	const seedFrequencyDatabase = async () => {
    await Frequency.deleteMany({})

    dataFrequency.forEach((frequencyData) => {
			new Frequency(frequencyData).save()
		})
  }

  seedFrequencyDatabase()
}

module.exports = Frequency;