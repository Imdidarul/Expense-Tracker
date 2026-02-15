const express = require("express")
const router = express.Router()
const expenseController = require("../controller/expenseController")
const aiController = require("../controller/aiController")
const userauthentication = require("../middleware/auth")

router.post("/addExpense",userauthentication.authenticate, expenseController.addExpense)
router.get("/getExpense",userauthentication.authenticate, expenseController.getExpenses)
router.put("/updateExpense/:id",userauthentication.authenticate, expenseController.updateExpense)
router.delete("/deleteExpense/:id", userauthentication.authenticate,expenseController.deleteExpense)
router.post("/ask", aiController.whatCategory)

module.exports = router