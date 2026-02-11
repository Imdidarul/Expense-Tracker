const express = require("express")
const router = express.Router()
const userauthentication = require("../middleware/auth")
const { getLeaderboard } = require("../controller/leaderboardController")

router.get("/leaderboard", userauthentication.authenticate, getLeaderboard)

module.exports = router
