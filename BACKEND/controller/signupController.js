const User = require("../model/user")

const addUser = async (req,res)=>{
    try {
        const {name, email, password} = req.body

        const user = await User.create({
            name: name,
            email:email,
            password:password
        })

        console.log("User is created")
        res.status(201).send(`User ${name} is created!`)
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).send("Email already exists");
        }
        res.status(500).send("Unable to add user!")
    }
}


module.exports = {addUser}