const express = require('express')
const router = express.Router()
const { IsAuth } = require('../middleware/auth')

const cartsController = require('../controllers/cartsController')

router.get('/me', IsAuth, cartsController.getCurrentUserCart)
router.post('/', IsAuth, cartsController.addToCart)
router.delete('/:id', IsAuth, cartsController.removeCart)

module.exports = router