const express = require("express")
const router = express.Router()
const loginController = require("../controller/loginController")



router.post("/forgotPassword",loginController.forgotPassword)
router.post("/updatePassword",loginController.updatePassword)


module.exports = router