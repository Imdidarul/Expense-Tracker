const User = require("./user")
const Expense = require("./expense")
const Download = require("./download")
const ForgotPasswordRequests = require("./forgotPasswordRequests")

User.hasMany(Expense)
Expense.belongsTo(User)


User.hasMany(ForgotPasswordRequests)
ForgotPasswordRequests.belongsTo(User)

User.hasMany(Download)
Download.belongsTo(User)

module.exports = {
    User,
    Expense,
    ForgotPasswordRequests,
    Download
}