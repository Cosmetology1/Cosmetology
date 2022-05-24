const router = require("express").Router()

const {getStylistAuth} = require("../controllers/auth")
const { authMiddleware } = require("../middleware/auth")

router.route("/").get(authMiddleware, getStylistAuth)

module.exports = router;