const asyncHandler=require('express-async-handler')
const Order=require('../models/orderModel')
const Product=require('../models/productModel')

//@desc		GET all orders
//@route	GET /api/v1/orders
//@access	Private/Admin
const getAllOrders=asyncHandler(async(req,res)=>{
	const orders=await Order.find({}).populate('user', 'id name')
	if(orders){
		let totalAmount=0
		orders.map(order=>totalAmount += order.totalPrice)
		res.status(200).json({
			count:orders.length, 
			totalAmount, 
			orders
		})
	}else{
		res.status(404)
		throw new Error('Orders not found')
	}
})

//@desc 	Update order to be delivered
//@route 	PUT /api/v1/orders/:id/deliver
//@access Private/admin
const updateOrderToDelivered=asyncHandler(async(req,res)=>{
	const order=await Order.findById(req.params.id)
	if(order){
		order.isDelivered=true
		order.deliveredAt=Date.now()
		const updatedOrder=await order.save()
		res.status(200).json(updatedOrder)
	}else{
		res.status(404)
		throw new Error('Order not updated')
	}
})

/////////////////////////////////
//@desc		GET order by ID
//@route	GET /api/v1/orders/:id
//@access	Private
const getOrderById=asyncHandler(async(req,res)=>{
	const order=await Order.findById(req.params.id).populate('user', 'name email')
	if(order){
		res.status(200).json(order)
	}else{
		res.status(404)
		throw new Error('Order not found')
	}
})

/////////////////////////////////
//@desc 	Get logged in user orders
//@route 	GET /api/v1/orders/myorders
//@access Private
const getMyOrders=asyncHandler(async(req,res)=>{
	const orders=await Order.find({user:req.user._id})
	if(orders){
		res.status(200).json(orders)
	}else{
		res.status(404)
		throw new Error('Orders not found')
	}
})


//@desc 	Create new order
//@route 	POST /api/v1/orders
//@access Private
const createOrder=asyncHandler(async(req,res)=>{
	const {
		orderItems, shippingAddress, paymentMethod,
		itemsPrice, taxPrice, shippingPrice, totalPrice
	}=req.body
	if(orderItems && orderItems.length === 0){
		res.status(404)
		throw new Error('No order items')
		return
	}else{
		const order=new Order({
			user:req.user._id,
			orderItems,  shippingAddress, paymentMethod, 
			itemsPrice, taxPrice, shippingPrice, totalPrice
		})
		const createdOrder=await order.save()
		res.status(200).json(createdOrder)
	}
})

//@desc 	Update order to be paid
//@route 	PUT /api/v1/orders/:id/pay
//@access Private
const updateOrderToPay=asyncHandler(async(req,res)=>{
	const order=await Order.findById(req.params.id)
	if(order){

		order.isPaid=true
		order.paidAt=Date.now()
		order.paymentResult={
			id:req.body.id,
			status:req.body.status,
			update_time:req.body.update_time,
			email_address:req.body.payer.email_address
		}
		order.orderItems.map(async item=>{
			await updateStock(item.product, item.quantity)
		})
		const updatedOrder=await order.save({validateBeforeSave:false})
		res.status(200).json(updatedOrder)
	}else{
		res.status(404)
		throw new Error('Order not paid')
	}
})

async function updateStock(id, quantity){
	const product=await Product.findById(id)
	product.stock=product.stock - quantity
	await product.save({validateBeforeSave:false})
}
//////////////////////////////////////

module.exports={
	getAllOrders, updateOrderToDelivered,
	getOrderById,
	getMyOrders,  createOrder, updateOrderToPay
}