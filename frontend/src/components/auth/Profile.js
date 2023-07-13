import {useState, useEffect} from 'react'
import {Form, Figure, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import {getUserDetails, updateUserProfile} from '../../actions/userActions'
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants'

const Profile=({location, history})=>{
	const [name, setName]=useState('')
	const [email, setEmail]=useState('')
	//const [oldPassword, setOldPassword]=useState('')
	const [password, setPassword]=useState('')
	const [confirmPassword, setConfirmPassword]=useState('')
	const [avatar, setAvatar]=useState('')
	const	[avatarPreview, setAvatarPreview]=useState('')
	const [message, setMessage]=useState(null)

	const dispatch=useDispatch()
	
	const userDetails=useSelector(state=>state.userDetails)
	const {loading, error, user}=userDetails
	
	const userAuth=useSelector(state=>state.userAuth)
	const {userInfo}=userAuth
	
	const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
	const {success}=userUpdateProfile
	
	console.log('PROFILE USER;', user)
	console.log('PROFILE INFO;', userInfo)
	
	useEffect(()=>{
		if(!userInfo){
			history.push('/login')
		}else{
			if(!user || !user.name || success){
				dispatch({type:USER_UPDATE_PROFILE_RESET})
				dispatch(getUserDetails('profile'))
			}else{
				//console.log(user)
				setName(user.name)
				setEmail(user.email)
				setAvatarPreview(user.avatar.url)
			}
		}
	}, [dispatch, history, user, userInfo, success])
	
	const submitHandler=e=>{
		e.preventDefault()
		if(password !== confirmPassword){
			setMessage('Passwords do not match')
			setPassword('')
			setConfirmPassword('')
			setTimeout(()=>{setMessage('')}, 5000)
		}else{
			const formData=new FormData()
			formData.set('name', name)
			formData.set('email', email)
			//formData.set('oldPassword', oldPassword)
			formData.set('password', password)
			formData.set('avatar', avatar)
			
			dispatch(updateUserProfile(formData))
			
			//setOldPassword('')
			setPassword('')
			setConfirmPassword('')
		}
	}

	const onFileSelected=e=>{
		//console.log(e.target.files[0])
		const reader=new FileReader()
		reader.onload=()=>{
			if(reader.readyState===2){
				setAvatarPreview(reader.result)
				setAvatar(reader.result)
			}
		}
		reader.readAsDataURL(e.target.files[0])
	}
	//console.log(userInfo)
	return(
		<Row>
			<Col md={12}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{loading ? (<Loader />) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler} 
					encType='multipart/form-data'>
					
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control type='text' 
								placeholder='Enter Name'
								value={name}
								onChange={e=>setName(e.target.value)}
							>							
							</Form.Control>
						</Form.Group>
						
						<Form.Group controlId='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' 
								placeholder='Enter Email'
								value={email}
								onChange={e=>setEmail(e.target.value)}
							>							
							</Form.Control>
						</Form.Group>						
						
						

						
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' 
								placeholder='Enter Password'
								value={password}
								onChange={e=>setPassword(e.target.value)}
							>							
							</Form.Control>
						</Form.Group>
						
						<Form.Group controlId='confirmPassword'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control type='password' 
								placeholder='Confirm Password'
								value={confirmPassword}
								onChange={e=>setConfirmPassword(e.target.value)}
							>							
							</Form.Control>
						</Form.Group>
						
						<Form.Group controlId='avatar'>
							<Figure>
								<Figure.Image alt='Avatar Preview'
									src={avatarPreview}
									width={160} height={150}
									roundedCircle
								/>
							</Figure>
							<Form.File 
								name='avatar'
								custom label='Choose Avatar'
								accept='images/*'
								onChange={onFileSelected}
							>
							</Form.File>
						</Form.Group>
						
						<Button type='submit' variant='primary'
							disabled={loading? true : false}>
							Update
						</Button>
					</Form>
				)}
			</Col>
		</Row>
	)
}
export default Profile
/*
						<Form.Group controlId='oldPassword'>
							<Form.Label>Old Password</Form.Label>
							<Form.Control type='password' 
								placeholder='Enter Old Password'
								value={oldPassword}
								onChange={e=>setPassword(e.target.value)}
							>							
							</Form.Control>
						</Form.Group>
*/