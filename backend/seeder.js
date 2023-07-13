const mongoose=require('mongoose')
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const colors=require('colors')
const users=require('./data/users')
const products=require('./data/products')
const User=require('./models/userModel')
const Product=require('./models/productModel')
//const Order=require('./models/orderModel')

dotenv.config()
connectDB()

const importData=async()=>{
	try{
		//await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		
		//const createdUsers=await User.insertMany(users)
		//const adminUser=createdUsers[0]._id
		
		/*const sampleProducts=products.map(product=>{
			return {...product, user:adminUser}
		})
		await Product.insertMany(sampleProducts)*/
		
		await Product.insertMany(products)
		
		console.log('Data Imported!'.green.inverse)
		process.exit()
	}catch(err){
		console.log(`${err}`.red.inverse)
		process.exit(1)
	}
}

const destroyData=async()=>{
	try{
		//await Order.deleteMany()
		await User.deleteMany()
		await Product.deleteMany()
		
		console.log('Data destroyed!'.green.inverse)
		process.exit()
	}catch(err){
		console.log(`${err}`.red.inverse)
		process.exit(1)
	}
}

if(process.argv[2]==='-d'){
	destroyData()
}else{
	importData()
}