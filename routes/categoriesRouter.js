const { IsAuth } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

const categoriesController = require('../controllers/categoriesController')

router.get('/', categoriesController.getAllCategories)
router.post('/', IsAuth, categoriesController.createNewCategory)
router.get('/:id', IsAuth, categoriesController.getCategory)
router.put('/:id', IsAuth, categoriesController.updateCategory)
router.delete('/:id', IsAuth, categoriesController.deleteCategory)

module.exports = router