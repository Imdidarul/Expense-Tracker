const express = require("express")
const app = express()
require('dotenv').config()
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
// const db = require("./utils/dbConnection")
const mongoose = require("mongoose")
const fs = require("fs")
const expenseRoute = require("./routes/expenseRoute")
const signupRoute = require("./routes/signupRoute")
const loginRoute = require("./routes/loginRoute")
const paymentRoute = require("./routes/paymentRoute")
const leaderboardRoute = require("./routes/leaderboardRoute")
const passwordRoute = require("./routes/passwordRoute")
const checkRoute = require("./routes/checkRoute")
const path = require("path")


const logStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags: 'a'}
);



app.use(cors())
app.use(express.json())
app.use(helmet())
// app.use(morgan('combined', {stream: logStream}))

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
  });
app.use("/user",signupRoute)
app.use("/login",loginRoute)
app.use("/expenses",expenseRoute)
app.use("/api/payment", paymentRoute);
app.use("/api", leaderboardRoute)
app.use("/password/",passwordRoute)
app.use("/check",checkRoute)



mongoose.connect(process.env.MONGO_URI).then(res=>{
    console.log("Mongo connected")
    app.listen(process.env.PORT || 3000, "0.0.0.0",()=>{
        console.log("Server is running")
    })
}).catch(err=>{
    console.log(err)
})

// db.sync().then(()=>{
//     app.listen(process.env.PORT || 3000,"0.0.0.0",(err)=>{
//         console.log("Server is running")
//     })
// }).catch((err)=>{
//     console.log("Unable to connect to server")
// })