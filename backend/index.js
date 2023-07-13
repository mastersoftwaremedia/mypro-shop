const express=require('express')
const cors=require('cors')
const path=require('path')
const dotenv=require('dotenv')
const colors=require('colors')
const morgan=require('morgan')
const {notFound, errorHandler}=require('./middlewares/errorMiddleware')
const connectDB=require('./config/db')
const fileUpload=require('express-fileupload')
const cloudinary=require('cloudinary')

const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const orderRoutes=require('./routes/orderRoutes')


dotenv.config()
connectDB()
cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET
})
const app=express()

if(process.env.NODE_ENV==='DEVELOPMENT'){
	app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())

//Define Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/orders', orderRoutes)

app.get('/api/config/paypal', (req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))


//Serve static assets if in production
if(process.env.NODE_ENV=='PRODUCTION'){
	app.use(express.static(path.join(__dirname, './frontend/build')))
	//app.use(express.static('frontend/build'))
	app.get('*', (req,res)=>{
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	})
}else{
	app.get('/', (req,res)=>res.send('API is runnning...'))
}

//Error handler
app.use(notFound)
app.use(errorHandler)

//Setting port
const PORT=process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

/*
const uploadRoutes=require('./routes/uploadRoutes')
//const paymentRoutes=require('./routes/paymentRoutes')
//Setting static folder
//const folder=path.resolve()
//app.use('/uploads', express.static(path.join(folder, '/uploads')))

if(cloudinary){
	console.log(process.env.CLOUDINARY_CLOUD_NAME)
}else{
	console.log('Not working')
}
*/