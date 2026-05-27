const User = require("../model/user")

const getLeaderboard = async (req, res) => {
    try {
        const userId = req.user.id

        const user = await User.findById(userId)

        if (!user.premium) {
            return res.status(403).json({
                success: false,
                message: "Only premium users can access leaderboard"
            })
        }

        const users = await User.find({}).select("name totalExpense").sort({totalExpense: -1})

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}


module.exports = { getLeaderboard }

// const getLeaderboard = async (req,res)=>{
//     try {

//         if (!req.user.premium){
//             return res.status(403).json({message:"Not auothorized"})
//         }

//         const users = await User.findAll({
//             attributes:['id', 'name',[sequelize.fn('SUM',sequelize.col('Expenses.amount')), 'totalExpense']],
//             include:[{
//                 model: Expense,
//                 attributes: []
//             }],
//             group:['Users.id'],
//             order:[['totalExpense', 'DESC']]
//         })

//         console.log(users)

//         res.status(200).json(users)
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//     }
// }

