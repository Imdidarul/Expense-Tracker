const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./utils/dbConnection")
const expenseRoute = require("./routes/expenseRoute")
const signupRoute = require("./routes/signupRoute")
const loginRoute = require("./routes/loginRoute")
const paymentRoute = require("./routes/paymentRoute")
const leaderboardRoute = require("./routes/leaderboardRoute")
const passwordRoute = require("./routes/passwordRoute")
const checkRoute = require("./routes/checkRoute")
require('dotenv').config()


app.use(cors())

app.use(express.json())

app.use("/user",signupRoute)
app.use("/login",loginRoute)
app.use("/expenses",expenseRoute)
app.use("/api/payment", paymentRoute);
app.use("/api", leaderboardRoute)
app.use("/password/",passwordRoute)
app.use("/check",checkRoute)




db.sync({alter:true}).then(()=>{
    app.listen(3000,(err)=>{
        console.log("Server is running")
    })
}).catch((err)=>{
    console.log("Unable to connect to server")
})