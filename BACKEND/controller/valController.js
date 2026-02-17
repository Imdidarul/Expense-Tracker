const User = require("../model")

const getPremiumStatus = async (req, res) => {
    try{
        const user = req.user
        res.json({ premium: user.premium })
    }catch(err){
        res.status(500).json({message:"Failed to check premium"})
    }
}


module.exports = {getPremiumStatus}