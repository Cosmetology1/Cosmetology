const defaultProfilePicURL = require("../util/defaultPic");
const StylistModel = require("../model/StylistModel");
const axios = require("axios");
const ClientModel = require("../model/ClientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const emailRegex = /(\W|^)[\w.+\-]*@west-mec\.org(\W|$)/;

// const TeacherModel = require("../model/TeacherModel");

//! make so that only west-mec email work
// const getEmailAvailable = async (req, res) => {};

//! add teacher code to change student to teacher
const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    hours,
    teacher,
    session,
    studentYear,
    teacherCode,
    isTeacher,
    // userId,
    teachId,
  } = req.body;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");
  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters long");

  //! This makes it so you can only create an account using a West-Mec email.
  //! I commented it out for now so you can test with any email

  // const test = emailRegex.test(email);
  // if (!(test || emailRegex.test(email))) {
  //   return res.status(401).send("Invalid email");
  // }

  try {
    let stylist;
    stylist = await StylistModel.findOne({ email: email.toLowerCase() });
    if (stylist) return res.status(401).send("Email Already in Use");

    stylist = new StylistModel({
      //sets the first letter to be auto capital
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName,
      email: email.toLowerCase(),
      password,
      teacher,
      teacherCode,
      session,
      studentYear,
      isTeacher,
      teachId,
      profilePicURL: req.body.profilePicURL || defaultProfilePicURL,
      hours,
      // userId,
    });

    stylist.password = await bcrypt.hash(password, 10);
    stylist = await stylist.save();
    // stylist.stylistId = stylist._id

    const payload = { stylistId: stylist._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        console.log(`Error at jwt.sign ${err}`);
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log(`Error at CreateUser ${error}`);
    return res.status(500).send("Server Error");
  }
};

const postLoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");
  if (password.legnth < 6)
    return res.status(401).send("Password must be at least 6 characters long");

  try {
    const stylist = await StylistModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!stylist) return res.status(401).send("Invalid Credentials");
    const isPassword = await bcrypt.compare(password, stylist.password);

    if (!isPassword) return res.status(401).send("Invalid Credentials");

    const payload = { stylistId: stylist._id };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.log(`Error at postUserLogin ${error}`);
    return res.status(500).send("Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    let stylists;
    stylists = await StylistModel.find();
    return res.status(200).json(stylists);
  } catch (error) {
    console.log(`Error at getAllUsers ${error}`);
    return res.status(500).send("Server Error @ getAllStylists");
  }
};

const addHours = async (req, res) => {
  const { hour, user } = req.body;
  try {
    const getStylists = async () => {
      try {
        const stylist = await StylistModel.findOne({ userId: user });

        stylist.hours = +stylist.hours + +hour + "";
        await stylist.save();
        return res.status(200).send("All Good");
      } catch (error) {
        console.log(`Error at GetStylists ${error}`);
      }
    };
    getStylists();
  } catch (error) {
    console.log(`Error at addHours ${error}`);
  }
};

const sortStylists = async (req, res) => {
  const { text } = req.body;
  let stylists;

  try {
    console.log(`Is userProfile receiving text? ${text}`);

    if (text === "") {
      console.log("Sort is undefined.");
    }

    if (text === "Teacher") {
      stylists = await StylistModel.find().sort({ teacher: 1 });
    }
    if (text === "Session") {
      stylists = await StylistModel.find().sort({ session: 1 });
    }
    if (text === "Hour") {
      stylists = await StylistModel.find().sort({ studentYear: 1 });
    }
    if (text === "Name") {
      stylists = await StylistModel.find().sort({ firstName: 1 });
    }

    console.log(`stylists: ${stylists}`);

    return res.status(200).json({
      stylists,
    });
  } catch (error) {
    console.log(`Error at sortStylists ${error}`);
    return res.status(400).send("Error at sortStylist");
  }
};

const sortClient = async (req, res) => {
  const { text } = req.body;
  let clients;

  try {
    console.log(`This is text: ${text}`);

    if (text === "") {
      console.log("Sort is undefined.");
    }

    if (text === "First Name") {
      clients = await ClientModel.find().sort({ firstName: 1 });
    }
    if (text === "Last Name") {
      clients = await ClientModel.find().sort({ lastName: 1 });
    }
    if (text === "Age") {
      clients = await ClientModel.find().sort({ age: 1 });
    }
    if (text === "Date Created") {
      clients = await ClientModel.find().sort({ dateCreated: 1 });
    }
    console.log(clients);
    return res.status(200).json({
      clients,
    });
  } catch (error) {
    console.log(`Error at sortClients ${error}`);
    return res.status(400).send("Error at sortClients");
  }
};

module.exports = {
  createUser,
  postLoginUser,
  getAllUsers,
  addHours, 
  sortStylists,
  sortClient
};
