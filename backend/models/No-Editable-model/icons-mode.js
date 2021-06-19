const mongoose = require("mongoose");
const fs = require("fs-extra");

const Icon = mongoose.model("Icons", {
  imageName: String,
  url: String,
});
module.exports = Icon;

if (process.env.RESET_DB) {
  const seedIconDatabase = async () => {
    await Icon.deleteMany({});

    const imageFolder = "./public/assets/";
    fs.readdir(imageFolder, (err, files) => {
        files.forEach((IconData) => {
          new Icon({
              imageName: IconData.replace(".png",""),
              url: `${process.env.BASE_URL}/icon-directory/${IconData}`
          }).save();
        });
    });

  };

  seedIconDatabase();
}
