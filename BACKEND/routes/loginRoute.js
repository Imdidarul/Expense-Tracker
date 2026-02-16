const express = require("express")
const router = express.Router()
const loginController = require("../controller/loginController")


router.post("/validate",loginController.validate)
router.post("/forgotPassword",loginController.forgotPassword)


module.exports = router