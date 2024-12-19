const express = require('express')
const router = express.Router()
const { IsAuth } = require('../middleware/auth')
const productsController = require('../controllers/productsController')
const upload = require('../config/multer')

router.get('/', productsController.getAllProduct)
router.get('/user/:username', productsController.getAllProductByUser)
router.get('/:id', productsController.getProductById)
router.post('/', upload.array('images', 10), IsAuth, productsController.createNewProduct)
router.put('/:id', IsAuth, productsController.updateProduct)
router.delete('/:id', IsAuth, productsController.deleteProduct)

module.exports = router;