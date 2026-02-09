const jwt = require("jsonwebtoken")
const {User} = require("../model")


const authenticate = (req, res, next)=>{
    try {
        const token = req.header("authorization")
        console.log(token)

        const extracted = jwt.verify(token, "thisisasecretkey")
        const userid = extracted.userId

        User.findByPk(userid).then(user=>{
            req.user = user
            next()
        }).catch(err=>{
            console.log(err)
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({success: false})
    }
}

module.exports = {authenticate}