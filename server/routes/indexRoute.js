const router = require("express").Router();

const { sortClient } = require("../controllers/index");

router.route("/").post(sortClient);

module.exports = router;
