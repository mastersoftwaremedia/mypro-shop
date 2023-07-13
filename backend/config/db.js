const mongoose=require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

const connectDB=async()=>{
	try{
		const conn=await mongoose.connect(
		//process.env.DB_LOCAL_URI, {
		process.env.DB_URI, {
			useNewUrlParser:true,
			useCreateIndex:true,
			useUnifiedTopology:true
			//useFindAndModify:false		
		})
		console.log(`DB Connected: ${conn.connection.host}`.cyan.underline)
	}catch(error){
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}
module.exports=connectDB