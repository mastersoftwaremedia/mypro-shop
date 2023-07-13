const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema=new mongoose.Schema({
	name:{
		type:String, 
		required:[true, 'Please enter your name'],
		maxLength:[30, 'Your name cannot exceed 30 characters']
	},
	email:{
		type:String, 
		required:[true, 'Please enter your email'], 
		unique:true,
		validate:[validator.isEmail, 'Please enter valid email address']
	},
	password:{
		type:String, 
		required:[true, 'Please enter your password'],
		minLength:[6, 'Your password must be longer than 6 characters'],
		select:false
	},
	avatar:{
		public_id:{type:String, 
			required:true
		},
		url:{type:String, 
			required:true
		}
	},
	isAdmin:{type:Boolean, required:true, default:true},
	createdAt:{type:Date, default:Date.now},
	resetPasswordToken:String,
	resetPasswordExpire:Date
}, {timestamps:true})

//Encrypting password before saving user
userSchema.pre('save', async function(next){
	if(!this.isModified('password')){
		return next()
	}
	const salt=await bcrypt.genSalt(10)
	this.password=await bcrypt.hash(this.password, salt)
})

//Return compare user password
userSchema.methods.comparePassword=async function(enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password)
}

//Return generated token
userSchema.methods.generateToken=function(){
	return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES_TIME})
}

//Return generated password reset token
userSchema.methods.getResetPasswordToken=function(){
	//generate token
	const resetToken=crypto.randomBytes(20).toString('hex')
	//hash and set to resetPasswordToken
	this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
	//set token expire time
	this.resetPasswordExpire=Date.now() + 30 * 60 * 1000
	return resetToken
}

module.exports=mongoose.model('User', userSchema)