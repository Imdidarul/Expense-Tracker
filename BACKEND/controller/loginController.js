const { where } = require("sequelize")
const User = require("../model/user")


const validate = async (req,res)=>{
    try {
        const {email,password} = req.body

    const user = await User.findOne({where:{email:email}})
    if(!user){
        return res.status(404).json({message:"Error:404 User not found"})
        
    }

    if(user.password != password){
        return res.status(401).json({message:"Error: 401 Password is incorrect"})
    }

    console.log("user logged in successfully")
    res.status(200).send("User logged in successfully")
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {validate}