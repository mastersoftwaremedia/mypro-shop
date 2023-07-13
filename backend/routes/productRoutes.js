const express=require('express')
const router=express.Router()
const {
	getProducts, getProduct, //getTopProducts,
	createProduct, updateProduct, deleteProduct	
}=require('../controllers/productController')
const {verify, admin}=require('../middlewares/authMiddleware')

//'http://localhost:5000/api/v1/products'
router.route('/').get(getProducts)
router.route('/').post(verify, admin, createProduct)
router.route('/:id').get(getProduct)
router.route('/:id').put(verify, admin, updateProduct)
router.route('/:id').delete(verify, admin, deleteProduct)

module.exports=router