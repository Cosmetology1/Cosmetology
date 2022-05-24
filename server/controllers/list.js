const StylistModel = require("../model/StylistModel");
const ClientModel = require("../model/ClientModel");

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

const deleteStylist = async (req, res) => {
  const { userIds } = req.body;
  try {
    console.log(`This is: ${userIds}`);

    if (userIds === undefined) {
      console.log("No User ID. Error because undefined.");
      return res.status(404).send("No UserId");
    } else if (userIds === "") {
      console.log("No User ID. Error because empty string.");
      return res.status(404).send("No UserId");
    }

    const look = await StylistModel.findOne({ userId: userIds });
    console.log(`This was your stylist: ${look}`);
    const stylists = await StylistModel.findOneAndDelete({ userId: userIds });

    if (!stylists) {
      return res.status(404).send("No Stylist Found");
    }

    return res.status(200).json({
      stylists,
    });
  } catch (error) {
    console.log(`Failed userIds: ${userIds}`);
    return res.status(500).send("Error @deleteStylist");
  }
};

const sortStylists = async (req, res) => {
  const { text } = req.body;
  let stylists;

  try {
    console.log(`This is text: ${text}`);

    if (text === "") {
      console.log("Sort is undefined.");
    }

    if (text === "Teacher") {
      stylists = await StylistModel.find().sort({ teacher: 1 });
    }
    if (text === "Session") {
      stylists = await StylistModel.find().sort({ session: 1 });
    }
    if (text === "Year") {
      stylists = await StylistModel.find().sort({ studentYear: 1 });
    }
    if (text === "Name") {
      stylists = await StylistModel.find().sort({ firstName: 1 });
    }

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
  getAllUsers,
  sortStylists,
  deleteStylist,
  sortClient
};
 