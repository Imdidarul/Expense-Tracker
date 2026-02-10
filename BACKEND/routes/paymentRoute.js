const express = require("express");
const router = express.Router();
const { createPayment, verifyPayment } = require("../controller/paymentController");
const userauthentication = require("../middleware/auth")

router.post("/create-payment", userauthentication.authenticate, createPayment);
router.post("/verify-payment", userauthentication.authenticate, verifyPayment);

module.exports = router;
