const ClientModel = require("../model/ClientModel");

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
  sortClient,
};
