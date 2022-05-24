const router = require("express").Router();

const {
  createUser,
  postLoginUser,
  getAllUsers,
  addHours,
  sortStylists,
  sortClient
} = require("../controllers/userProfile");

router.route("/signup").post(createUser);
router.route("/login").post(postLoginUser);
router.route("/").get(getAllUsers);
router.route("/NormNavbar").get(getAllUsers);
router.route("/UserProfile").get(getAllUsers).patch(addHours);
router.route("/sort").post(sortStylists);
router.route("/sort2").post(sortClient);


module.exports = router;
