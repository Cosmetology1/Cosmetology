const StylistModel = require("../model/StylistModel");
const TeacherModel = require("../model/TeacherModel");

const getStylistAuth = async (req, res) => {
  //TODO: Might have to create this later
  const { stylistId } = req;

  // If stylistId = false, returns this. If stylistId  = true, continues to try catch statement  */
  if (!stylistId) return res.status(500).send("No Stylist Found");

  try{
    const stylist = await StylistModel.findById(stylistId)
    return res.status(200).json({stylist})
  } catch (err) {
    console.log(`Error at getStylistAuth ${err}`);
    return res.status(500).send("server error in getStylistAuth")
  }
};

// Going to have to add student list later when we have students to
// test with
const getTeacherAuth = async (req, res) => {
  //TODO: Might have to create this later
  const { teacherId } = req;

  // If stylistId = false, returns this. If stylistId  = true, continues to try catch statement  */
  if (!teacherId) return res.status(500).send("No Teacher Found");

  try{
    const teacher = await TeacherModel.findById(teacherId)
    return res.status(200).json({teacher})
  } catch (err) {
    console.log(`Error at getTeacherAuth ${err}`);
    return res.status(500).send("server error in getTeacherAuth")
  }
};

module.exports = {getStylistAuth, getTeacherAuth}
