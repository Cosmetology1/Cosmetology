// const ProfileModel = require("../model/ProfileModel");
const StylistModel = require("../model/StylistModel");
// const bcrypt = require("bcryptjs")

const getProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const stylist = await StylistModel.findOne({ userId });

    if (!stylist) {
      return res.status(404).send("No Stylist Found");
    }

    const profile = await StylistModel.findOne({
      userId: stylist.userId,
    }).populate("userId");

    return res.status(200).json({
      profile,
    });
  } catch (error) {
    console.log(`Error at getProfile ${error}`, userId);
    return res.status(500).send("Error @getProfile");
  }
};

const getTeacher = async (req, res) => {
  const { userId } = req.params;
  try {
    const stylist = await StylistModel.findOne({ userId });

    if (!stylist) {
      return res.status(404).send("No Stylist Found");
    }
    if(stylist.isTeacher == false){
      return res.status(404).send("Not a Teacher")
    }

    const teacher = await StylistModel.findOne({
      userId: stylist.userId,
    }).populate("userId");

    return res.status(200).json({
      teacher,
    });
  } catch (error) {
    console.log(`Error at Get Teacher ${error}`, userId);
    return res.status(500).send("Error @getTeacher");
  }
};

module.exports = {
  getProfile,
  getTeacher,
};

