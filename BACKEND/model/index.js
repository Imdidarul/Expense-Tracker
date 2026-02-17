const User = require("./user")
const Expense = require("./expense")
const ForgotPasswordRequests = require("./forgotPasswordRequests")

User.hasMany(Expense)
Expense.belongsTo(User)


User.hasMany(ForgotPasswordRequests)
ForgotPasswordRequests.belongsTo(User)

module.exports = {
    User,
    Expense,
    ForgotPasswordRequests
}