const router = require("express").Router();

const { searchUsers } = require("../controllers/search");
const { auth } = require("../middleware/auth2");

router.route("/:searchText").get(auth, searchUsers);

module.exports = router;
