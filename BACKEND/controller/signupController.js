const {User} = require("../model/user")

const addUser = async (req,res)=>{
    try {
        const {name, email, password} = req.body

        const user = await User.create({
            name: name,
            email:email,
            password:password
        })

        console.log("User is created")
        res.satus(201).send(`User ${name} is created!`)
    } catch (error) {
        res.status(500).send("Unable to add user!")
    }
}


module.exports = {addUser}