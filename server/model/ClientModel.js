const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const today1 = new Date();
const yyyy = today1.getFullYear();
let mm = today1.getMonth() + 1; // Months start at 0!
let dd = today1.getDate();
if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;
const todayMain = mm + "/" + dd + "/" + yyyy;

const ClientSchema = new Schema({
  stylistName: {
    type: String,
  },
  stylistPic: {
    type: String,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  appointmentDate: {
    type: Date,
    required: true,
  },
  serviceRequest: {
    type: String,
  },
  medicalIssues: { type: String },

  address: { type: String },
  city: { type: String },
  state: { type: String },

  zipCode: { type: Number },
  phoneNumber: { type: String },
  email: {
    type: String,
  },

  hairCondition: { type: String },
  hairClassification: { type: String },
  scalpClassification: { type: String },

  hairTexture: { type: String },
  hairDensity: { type: String },
  growthPatterns: { type: String },

  hairElasticity: { type: String },
  hairPorosity: { type: String },
  hairLength: { type: String },
 
  //Will be made later for specification, currently unused
  // hairColor: { type: String },
  // hairCondition: {
  //   type: String,
  //   enum: [
  //     "Dry",
  //     "Normal",
  //     "Greasy",
  //     "Chemical Damage",
  //     "Environmental Damage",
  //     "Heat Damage",
  //     "Product Build-up",
  //   ],
  // },
  // hairClassification: {
  //   type: String,
  //   enum: ["Straight", "Wavy", "Curly", "Very Curly"],
  // },
  // scalpCondition: {
  //   type: String,
  //   enum: ["Dry Oily", "Dandruff Normal", "Product Build-up"],
  // },
  // hairTexture: {
  //   type: String,
  //   enum: ["Very Fine", "Fine", "Medium", "Coarse"],
  // },
  // growthPatterns: {
  //   type: String,
  //   enum: ["Nape Whorls", "Widows Peak", "Cowlick", "Double Crown"],
  // },
  // hairDensity: {
  //   type: String,
  //   enum: ["Very High", "High", "Medium", "Low", "Mix"],
  // },
  // hairPorosity: { type: String, enum: ["Low", "Average", "High"] },
  // hairElasticity: { type: String, enum: ["Good", "Average", "Poor", "Mix"] },
  // hairLength: { type: String, enum: ["Short", "Medium", "Long"] },

  visits: {
    type: Array,
  },

  dateCreated: {
    type: Date,
    default: todayMain,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
