const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Joi = require("joi")

const StylistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePicURL: { type: String },

    hours: {
      type: String,
      default: 0,
    },

    //uncomment later
    teacherCode: {
      type: String,
      // required: true,
    },

    session: {
      type: String,
      // required: true,
    },
    studentYear: {
      type: String,
      // required: true,
    },
    isTeacher: {
      type: String,
    },

    teacher: { type: String },

    teachId: { type: String },

    pastClients: { type: Array },

    userId: {
      type: String,
      default: Math.floor(Math.random() * 100) + (new Date().getTime()),
    },

    resetToken: { type: String },
    expireToken: { type: String },
  },

  { timestamps: true }
);

// const User = mongoose.model("Stylist", StylistSchema);

// const validate = (stylist) => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//     });
//     return schema.validate();
// };

// module.exports = { User, validate };

module.exports = mongoose.model("Stylist", StylistSchema);
