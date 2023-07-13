const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const sendEmail=require('../utils/sendEmail')
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
const cloudinary=require('cloudinary')



//@desc			Auth user and get token
//@route		POST /api/v1/users/login
//@access		public
const loginUser=asyncHandler(async(req,res)=>{
	const {email, password}=req.body
	//check if email and password is entered by user
	if(!email || !password){
		res.status(400)
		throw new Error('Please enter email or password')
	}
	const user=await User.findOne({email}).select('+password')
	if(user && (await user.comparePassword(password))){
		res.status(200).json({
			_id:user._id,
			name:user.name,
			email:user.email,
			avatar:user.avatar,
			isAdmin:user.isAdmin,
			token:user.generateToken(user._id)
		})
	}else{
		res.status(401)
		throw new Error('Invalid email or password login')
	}
})

//@desc			Register a new user
//@route		POST /api/v1/users
//@access		public
const registerUser=asyncHandler(async(req,res)=>{
	console.log(req.body)	
	const result=await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'avatars',
		width: 150,
		crop: 'scale'
	})
	const {name, email, password}=req.body
	if(!name || !email || !password){
		res.status(400)
		throw new Error('Please fill in fields')
	}
	const userExists=await User.findOne({email})
	if(userExists){
		res.status(400).json('Invalid login info')
	}
	const user=await User.create({
		name, email, password, 
		avatar:{
			public_id: result.public_id,
			url: result.secure_url
		}
	})
	if(user){
		return res.status(200).json({
			id:user._id,
			name:user.name,
			email:user.email,
			avatar:user.avatar,
			isAdmin:user.isAdmin,
			token:user.generateToken(user._id)
		})
	}else{
		res.status(401)
		throw new Error('Invalid email or password register')
	}
})
//////////////////////////////////////////////
//@desc			Get user profile
//@route		GET /api/v1/users/profile
//@access		private
const getUserProfile=asyncHandler(async(req,res)=>{
	const user=await User.findById(req.user._id).select('+password')
	if(user){
		res.status(200).json({
			_id:user._id,
			name:user.name,
			email:user.email,
			avatar:user.avatar,
			isAdmin:user.isAdmin
		})
	}else{
		res.status(404)
		throw new Error('User not found')
	}
})

//Need to add cloudinary//
//@desc			Update user profile
//@route		PUT /api/v1/users/profile
//@access		private
const updateUserProfile=asyncHandler(async(req,res)=>{
	const user=await User.findById(req.user._id).select('+password')
	console.log(user)
	if(user){
		user.name=req.body.name || user.name
		user.email=req.body.email || user.email
		/*const isMatched=await user.comparePassword(req.body.oldPassword)
		if(!isMatched){
			res.status(400)
			throw new Error('Old password is incorrect')			
		}*/
		
		if(req.body.password){
			const salt=await bcrypt.genSalt(10)
			user.password=await bcrypt.hash(req.body.password, salt)	
		}
		
		if(req.body.avatar !== ''){
			const image_id=user.avatar.public_id
			const res=await cloudinary.v2.uploader.destroy(image_id)
			const result=await cloudinary.v2.uploader.upload(req.body.avatar, {
				folder: 'avatars',
				width: 150,
				crop: 'scale'
			})
			user.avatar={
				public_id: result.public_id,
				url: result.secure_url
			}
		}
		
		const updatedUser=await User.findByIdAndUpdate(req.user._id, user, {
			new:true,
			runValidators:true,
			useFindAndModify:false
		})
		res.status(200).json({
			_id:updatedUser._id,
			name:updatedUser.name,
			email:updatedUser.email,
			avatar:updatedUser.avatar,
			isAdmin:updatedUser.isAdmin,
			token:user.generateToken(updatedUser._id)
		})
	}else{
		res.status(404)
		throw new Error('User not found')
	}
})

//Forgot password => /api/v1/password/forgot
const forgotPassword=asyncHandler(async(req,res)=>{
	const {email}=req.body
	//const user=await User.findOne({email:req.body.email})
	const user=await User.findOne({email})
	console.log(user)
	if(!user){
		res.status(404)
		throw new Error('User not found with this email')		
	}
	//get reset token
	const resetToken=user.getResetPasswordToken()
	console.log(resetToken)
	await user.save({validateBeforeSave:false})
	
	//create reset password URL
	const resetUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`
	const message=`
    <h2>You have a new reset token link</h2>	
		<h3>Your password reset token is as follows:</h3>
		<p>${resetUrl}</p>

		<h4>If you have not requested this email, then ignore it.</h4>
	`
	try{
		await sendEmail({
			email:user.email,
			subject:'MyShop Password Recovery',
			message
		})
		res.status(200).json({
			success:true, message:`Email sent to: ${user.email}`
		})
	}catch(error){
		user.resetPasswordToken=undefined
		user.resetPasswordExpire=undefined
		await user.save({validateBeforeSave:false})	
		return next(error)
	}
})

//Reset Password=> /api/v1/password/reset/:token
const resetPassword=asyncHandler(async(req,res)=>{
	const {email}=req.body
	//Hash url token
	const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
	const user=await User.findOne({
		resetPasswordToken, 
		resetPasswordExpire: {$gt: Date.now()}
	})
	if(!user){
		res.status(400)
		throw new Error('Password reset token is invalid or has been expired')		
	}
	if(req.body.password !== req.body.confirmPassword){
		res.status(400)
		throw new Error('Password does not match')
	}
	//setup new password
	user.password=req.body.password
	user.resetPasswordToken=undefined
	user.resetPasswordExpire=undefined
	await user.save()
	res.status(200).json({
		_id:user._id,
		name:user.name,
		email:user.email,
		avatar:user.avatar,
		isAdmin:user.isAdmin,
		token:user.generateToken(user._id)		
	})
})

////////////////////////////
//@desc			Get all users
//@route		Get /api/v1/users
//@access		Private/Admin
const getUsers=asyncHandler(async(req,res)=>{
	const users=await User.find({})
	if(users){
		res.status(200).json({count:users.length, users})
	}else{
		res.status(404)
		throw new Error('Users not found')
	}
})

//@desc			GET a user
//@route		GET /api/v1/users/:id
//@access		Private/Admin
const getUser=asyncHandler(async(req,res)=>{
	const user=await User.findById(req.params.id).select('-password')
	if(user){
		res.status(200).json(user)
	}else{
		res.status(404)
		throw new Error('User not found')
	}
})

//@desc			Update a user
//@route		PUT /api/v1/users/:id
//@access		Private/Admin
const updateUser=asyncHandler(async(req,res)=>{
	const user=await User.findById(req.params.id)
	if(user){
		user.name=req.body.name || user.name
		user.email=req.body.email || user.email
		user.isAdmin=
			req.body.isAdmin === undefined ?
				user.isAdmin : req.body.isAdmin
		const updatedUser=await user.save()
		res.status(200).json({
			//success:true, 
			//message:'User updated successfully',
			//user:{
				_id:updatedUser._id,
				name:updatedUser.name,
				email:updatedUser.email,
				avatar:updatedUser.avatar,
				isAdmin:updatedUser.isAdmin
			//}
		})
	}else{
		res.status(404)
		throw new Error('User not found')
	}
})


//@desc			DELETE a user
//@route		DELETE /api/v1/users/:id
//@access		Private/Admin
const deleteUser=asyncHandler(async(req,res)=>{
	const user=await User.findById(req.params.id)
	if(user){
		await user.remove()
		res.status(200).json({success:true, message:'User deleted successfully'})
	}else{
		res.status(404)
		throw new Error('User not found')
	}
})

module.exports={
	loginUser, registerUser, 
	getUserProfile, updateUserProfile, 
	forgotPassword, resetPassword, 
	getUsers, getUser, updateUser, deleteUser
}

/*
//Update /change password => /api/v1/password/update
const updatePassword=asyncHandler(async(req,res)=>{
	const user=await User.findById(req.user._id).select('+password')
	//check previous user password
	const isMatched=await user.comparePassword(req.body.oldPassword)
	if(!isMatched){
		res.status(400)
		throw new Error('Old password is incorrect')		
	}
	user.password=req.body.password
	await user.save()
	res.status(200).json({
		success:true,
		_id:user._id,
		name:user.name,
		email:user.email,
		isAdmin:user.isAdmin,
		token:user.generateToken(user._id)		
	})	
})
*/