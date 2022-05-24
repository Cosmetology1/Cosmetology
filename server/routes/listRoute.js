const router = require("express").Router();

const {
  sortStylists,
  getAllUsers,
  deleteStylist,
  sortClient
} = require("../controllers/list");

router.route("/").get(getAllUsers).post(deleteStylist)
router.post("/sort", sortStylists)
router.route("/sort2").post(sortClient)
 
module.exports = router;
