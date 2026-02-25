const express = require("express")
const router = express.Router()
const expenseController = require("../controller/expenseController")
const aiController = require("../controller/aiController")
const userauthentication = require("../middleware/auth")
const hug = require("../controller/testHug")

router.post("/addExpense",userauthentication.authenticate, expenseController.addExpense)
router.get("/getExpense",userauthentication.authenticate, expenseController.getExpenses)
router.put("/updateExpense/:id",userauthentication.authenticate, expenseController.updateExpense)
router.delete("/deleteExpense/:id", userauthentication.authenticate,expenseController.deleteExpense)
router.get("/downloadExpenses",userauthentication.authenticate, expenseController.downloadExpense)
router.get("/downloadedExpenses",userauthentication.authenticate, expenseController.downloadedExpense)
// router.post("/ask", aiController.whatCategory)
router.post("/ask", hug.whatCategory)

module.exports = router