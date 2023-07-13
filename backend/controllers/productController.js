const asyncHandler=require('express-async-handler')
const Product=require('../models/productModel')
const cloudinary=require('cloudinary')


//@desc 	Fetch all products
//@route 	GET /api/v1/products
//@access Public
const getProducts=asyncHandler(async(req,res)=>{
	/*const products=await Product.find()
	console.log(products)
	if(products){		
		res.status(200).json(products)*/
	const pageSize=4
	const page=Number(req.query.pageNumber) || 1
	const keyword=req.query.keyword ? {
		name:{
			$regex: req.query.keyword,
			$options: 'i'
		}
	} : {}
	const count=await Product.countDocuments({...keyword})
	const products=await Product.find({...keyword})
		.limit(pageSize)
		.skip(pageSize * (page - 1))
	if(products){
		res.status(200).json({
			products, page, 
			pages:Math.ceil(count/pageSize)
		})
	}else{
		res.status(404)
		throw new Error('Products not found')
	}
})


//@desc 	Fetch single product
//@route 	GET /api/v1/products/:id
//@access Public
const getProduct=asyncHandler(async(req,res)=>{
	const product=await Product.findById(req.params.id)
	if(product){
		res.status(200).json(product)
	}else{
		res.status(404)
		throw new Error('Product not found')
	}
})

////////////////////////////////////
//@desc 	Create a product
//@route 	POST /api/v1/products
//@access Private/admin
const createProduct=asyncHandler(async(req,res)=>{
	let images=[]
	if(typeof req.body.images==='string'){
		images.push(req.body.images)
	}else{
		images=req.body.images
	}
	
	let imagesLinks=[]
	for(let i=0; i < images.length; i++){
		const result=await cloudinary.v2.uploader.upload(images[i], {
			folder: 'products'
		})
		imagesLinks.push({
			public_id:result.public_id,
			url:result.secure_url
		})
	}
	
	req.body.images=imagesLinks
	req.body.user=req.user._id
	console.log(req.body.user)
	
	const product=await Product.create(req.body)
	if(product){
		res.status(200).json({success:true, product})
	}else{
		res.status(404)
		throw new Error('Product not created')
	}
})

//@desc 	Update a product
//@route 	PUT /api/v1/products/:id
//@access Private/admin
const updateProduct=asyncHandler(async(req,res)=>{
	let product=await Product.findById(req.params.id)
	if(!product){
		res.status(404)
		throw new Error('Product not found')		
	}
	
	let images=[]
	if(typeof req.body.images==='string'){
		images.push(req.body.images)
	}else{
		images=req.body.images
	}
	
	if(images !== undefined){
		//Deleting images associated with the product
		for(let i=0; i < product.images.length; i++){
			const result=await cloudinary.v2.uploader.destroy(product.images[i].public_id)
		}
		
		let imagesLinks=[]
		for(let i=0; i < images.length; i++){
			const result=await cloudinary.v2.uploader.upload(images[i], {
				folder:'products'
			})
			imagesLinks.push({
				public_id:result.public_id,
				url:result.secure_url
			})
		}
		req.body.images=imagesLinks
	}
	
	product=await Product.findByIdAndUpdate(req.params.id, req.body, {
		new:true,
		runValidators:true,
		useFindAndModify:false
	})
	res.status(200).json({success:true, product})
})
////////////////////////////////

//@desc 	Delete a product
//@route 	DELETE /api/v1/products/:id
//@access Private/admin
const deleteProduct=asyncHandler(async(req,res)=>{
	const product=await Product.findById(req.params.id)
	if(product){
		await product.remove()
		res.status(200).json({message:'Deleted Successfully'})
	}else{
		res.status(404)
		throw new Error('Product not deleted')
	}
})

//@desc 	Get top rated products
//@route 	GET /api/v1/products/top
//@access Public
/*const getTopProducts=asyncHandler(async(req,res)=>{
	const products=await Product.find({})//.sort({r})
	
})*/

module.exports={
	getProducts, getProduct, //getTopProducts,
	createProduct, updateProduct, deleteProduct
}

/*const updateProduct=asyncHandler(async(req,res)=>{
	const {name, price, description, images, brand, category,
		countInStock
	}=req.body
	
	const product=await Product.findById(req.params.id)
	if(product){
		product.name=name
		product.description=description
		product.price=price
		product.image=image
		product.brand=brand
		product.category=category
		product.countInStock=countInStock
		
		const updatedProduct=await product.save()
		res.status(200).json({sucess:true, updatedProduct})
	}else{
		res.status(404)
		throw new Error('Product not updated')
	}
})

const createProduct=asyncHandler(async(req,res)=>{
	const product=new Product({
		name:'Sample name',
		description:'Sample description',
		price:0,
		user:req.user._id,
		images:['/images/sample.jpg'],
		brand:'Sample brand',
		category:'Sample category',
		countInStock:0
	})
	const createdProduct=await product.save()
	if(createdProduct){
		res.status(200).json(createdProduct)
	}else{
		res.status(400)
		throw new Error('Product not created')
	}
})
*/