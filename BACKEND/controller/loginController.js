const User = require("../model/user")
const bcrypt = require("bcrypt")


const validate = async (req,res)=>{
    try {
        const {email,password} = req.body

    const user = await User.findOne({where:{email:email}})
    if(!user){
        return res.status(404).json({message:"Error:404 User not found"})
        
    }

    bcrypt.compare(password, user.password, (err, result)=>{
        if(err){
            return res.status(400).send("Something went wrong")
        }
        if(result){
            console.log("User logged in")
            res.status(200).send("User logged in succesfully")
        }else{
            return res.status(401).json({message:"Password is incorrect"})
        }
    })

    // console.log("user logged in successfully")
    // res.status(200).send("User logged in successfully")
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}


module.exports = {validate}