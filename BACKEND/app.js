const express = require("express")
const app = express()
const cors = require("cors")
const db = require("./utils/dbConnection")
const expenseRoute = require("./routes/expenseRoute")
const signupRoute = require("./routes/signupRoute")
const loginRoute = require("./routes/loginRoute")


app.use(cors())

app.use(express.json())

app.use("/user",signupRoute)
app.use("/login",loginRoute)
app.use("/expenses",expenseRoute)




db.sync().then(()=>{
    app.listen(3000,(err)=>{
        console.log("Server is running")
    })
}).catch((err)=>{
    console.log("Unable to connect to server")
})