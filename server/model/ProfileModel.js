const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema(
  {

    stylist: {
      type: String,
      ref: "Stylist"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
