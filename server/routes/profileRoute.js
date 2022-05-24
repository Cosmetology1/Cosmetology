const { getProfile } = require("../controllers/profile");

const router = require("express").Router();

router.route("/:userId").get(getProfile);
// router.route("/").post(cr);

module.exports = router;
 