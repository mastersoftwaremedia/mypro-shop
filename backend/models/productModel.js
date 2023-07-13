const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
	user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
	name:{
		type:String, 
		required:[true, 'Please enter product name'],
		trim:true,
		maxLength:[100, 'product name cannot exceed 100 characters']
	},
	images:[{
		public_id:{type:String, required:true},
		url:{type:String, required:true}
	}],
	brand:{type:String, required:true},
	category:{type:String, required:true},
	description:{
		type:String, 
		required:[true, 'Please enter product description']
	},
	price:{
		type:Number, 
		required:[true, 'Please enter product price'], 
		maxLength: [5, 'Product price cannot exceed 5 places'],
		//default:0.0
	},
	countInStock:{
		type:Number, 
		required:[true, 'Please enter product quantity'], 
		maxLength:[5, 'Product number position cannot exceed 7 characters'],
		default:0
	},
	createdAt:{type:Date, default:Date.now}
	//reviews, rating, numReviews
}, {timestamps:true})

module.exports=mongoose.model('Product', productSchema)