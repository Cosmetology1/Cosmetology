const router = require("express").Router();

const { createClient, getAllClients, addVisit } = require("../controllers/clientProfile");

router.route("/clientCreator").post(createClient).patch(addVisit)
router.route("/").get(getAllClients);
router.route("/UserProfile").patch(addVisit)

module.exports = router;
