// const defaultProfilePicURL = require("../util/defaultPic");
const ClientModel = require("../model/ClientModel");
const StylistModel = require("../model/StylistModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const axios = require("axios");

// let stylists = [];
const createClient = async (req, res) => {
  const {
    stylistName,
    stylistPic,
    firstName,
    lastName,
    email,
    age,
    appointmentDate,
    serviceRequest,
    medicalIssues,
    address,
    city,
    state,
    phoneNumber,
    zipCode,
    hairCondition,
    hairClassification,
    scalpClassification,
    hairTexture,
    hairDensity,
    growthPatterns,
    hairLength,
    hairPorosity,
    hairElasticity,
    visits,
  } = req.body.client;

  if (firstName.length > 20) return res.status(401).send("Firstname Too Long");
  if (lastName.length > 20) return res.status(401).send("Lastname Too Long");
  if (age.length > 3) return res.status(401).send("Realistic Age");
  if (!isEmail(email)) return res.status(401).send("Invalid Email");

  try {
    let client;
    client = await ClientModel.findOne({ email: email.toLowerCase() });
    if (client) return res.status(401).send("Email Already in Use");

    client = new ClientModel({
      stylistName,
      stylistPic,
      firstName,
      lastName,
      email: email.toLowerCase(),
      age,
      appointmentDate,
      serviceRequest,
      medicalIssues,
      address,
      city,
      state,
      phoneNumber,
      zipCode,
      hairClassification,
      hairCondition,
      scalpClassification,
      hairTexture,
      hairDensity,
      growthPatterns,
      hairElasticity,
      hairPorosity,
      hairLength,
      visits,
    });

    client = await client.save();

    const getStylists = async () => {
      try {
        const results = await axios.get(
          `http://localhost:3001/api/v1/stylists`
        );
        const stylists = results.data;
        console.log(`Stylists: ${stylists}`);

        let Testr = stylists.find(
          (stylist) => client.stylistName === stylist.email
        );
        console.log(`Tester`, Testr);

        const stylist = await StylistModel.findById(Testr._id);
        stylist.pastClients.push([
          client.firstName,
          client.lastName,
          client.dateCreated,
          client.appointmentDate,
        ]);
        console.log(`stylist`, stylist);
        await stylist.save();
        return res.status(200).send("All Good");

        // stylists.map((stylist) => {
        //   try {
        //     if (client.stylistName === stylist.email) {
        //       stylist.pastClients.push(
        //         `${client.firstName} + ${client.lastName} + ${client.dateCreated}`,
        //       );
        //     }
        //   } catch (error) {
        //     return res.status(500).send("Server Error");
        //   }
        // });
      } catch (error) {
        console.log(`Error at getStylist ${error}`);
      }
    };
    getStylists();
  } catch (error) {
    console.log(`Error at createClient ${error}`);
    return res.status(500).send("Server Error");
  }
};

const getAllClients = async (req, res) => {
  try {
    let clients;
    clients = await ClientModel.find();
    return res.status(200).json(clients);
  } catch (error) {
    console.log(`Error at getAllClients ${error}`);
    return res.status(500).send("Server Error @ getAllClients");
  }
};

const addVisit = async (req, res) => {
  const { addVisits, hairStyle, specialTreatment, clientUser } = req.body;

  try {
    const client = await ClientModel.findOne({ _id: clientUser });

    client.visits.push([[addVisits], [hairStyle], [specialTreatment]]);
    await client.save();
    return res.status(200).send("All Good");
  } catch (error) {
    console.log(`Error at addVisit ${error}`);
  }
};
module.exports = { createClient, getAllClients, addVisit };
