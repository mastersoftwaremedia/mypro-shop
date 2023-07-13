const express=require('express')
const router=express.Router()

const {
	loginUser, registerUser, 
	getUserProfile, updateUserProfile, 
	forgotPassword, resetPassword,
	//admin
	getUsers, getUser, updateUser, deleteUser
}=require('../controllers/userController')
const {verify, admin}=require('../middlewares/authMiddleware')

//'http://localhost:5000/api/v1/users'
//api/v1/users/profile
//api/v1/users/:id

router.route('/').post(registerUser)
router.route('/login').post(loginUser)

router.route('/profile').get(verify, getUserProfile)
router.route('/profile').put(verify, updateUserProfile)

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)

router.route('/').get(verify, admin, getUsers)
router.route('/:id').get(verify, admin, getUser)
router.route('/:id').put(verify, admin, updateUser)
router.route('/:id').delete(verify, admin, deleteUser)


module.exports=router