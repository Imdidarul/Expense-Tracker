const express = require("express");
const router = express.Router();
const { createPayment } = require("../controller/paymentController");
const userauthentication = require("../middleware/auth")

router.post("/create-payment", userauthentication.authenticate ,createPayment);

module.exports = router;
