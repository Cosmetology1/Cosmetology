const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitSchema =  new Schema({
client:{type: Schema.Types.ObjectId, ref:"Client"},
Date:{type:Date},
stylist:{type: Schema.Types.ObjectId, ref:"Stylist"},
style:{type: String},
notes:{type: String},
TimeItTook:{type: Number}



})
  
  module.exports = mongoose.model("Visit", VisitSchema);