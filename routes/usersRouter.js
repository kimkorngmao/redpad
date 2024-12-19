const express = require("express")
const router = express.Router()
const usersController = require('../controllers/usersController')
const { IsAuth } = require("../middleware/auth")

router.get('/me', IsAuth, usersController.getCurrentUser)

router.put('/me', IsAuth, usersController.updateCurrentUser)

module.exports = router;