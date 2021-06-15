const mongoose = require("mongoose")
const dataFrequency = require("../../frequencies.json")

const Frequency = mongoose.model('frequency',{
    frequencyName: String,
})

const RESET_DB = true


if (RESET_DB) {
	const seedFrequencyDatabase = async () => {
    await Frequency.deleteMany({})

    dataFrequency.forEach((frequencyData) => {
			new Frequency(frequencyData).save()
		})
  }

  seedFrequencyDatabase()
}

module.exports = Frequency;