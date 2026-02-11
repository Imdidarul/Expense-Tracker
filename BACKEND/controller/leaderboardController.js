const User = require("../model/user")

const getLeaderboard = async (req, res) => {
    try {

        if (!req.user.premium) {
            return res.status(403).json({
                success: false,
                message: "Only premium users can access leaderboard"
            })
        }

        const users = await User.findAll({
            attributes: ["name", "totalExpense"],
            order: [["totalExpense", "DESC"]]
        })

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { getLeaderboard }