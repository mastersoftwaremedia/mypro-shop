const express=require('express')
const router=express.Router()
const {
	getAllOrders, updateOrderToDelivered,
	getOrderById,
	getMyOrders,  createOrder, updateOrderToPay
}=require('../controllers/orderController')
const {verify, admin}=require('../middlewares/authMiddleware')

//'http://localhost:5000/api/v1/orders'
router.route('/').post(verify, createOrder)
router.route('/:id/pay').put(verify, updateOrderToPay)

router.route('/').get(verify, admin, getAllOrders)
router.route('/:id/deliver').put(verify, admin, updateOrderToDelivered)

router.route('/myorders').get(verify, getMyOrders)
router.route('/:id').get(verify, getOrderById)

module.exports=router