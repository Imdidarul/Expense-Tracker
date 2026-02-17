const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/auth")
const valController = require("../controller/valController")


router.get("/premium-status", authMiddleware.authenticate, valController.getPremiumStatus)


module.exports = router