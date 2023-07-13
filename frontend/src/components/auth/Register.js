import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Figure, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import FormContainer from '../layout/FormContainer'
import {register} from '../../actions/userActions'

const Register=({history, location})=>{
	const [name, setName]=useState('')
	const [email, setEmail]=useState('')
	const [password, setPassword]=useState('')
	const [confirmPassword, setConfirmPassword]=useState('')
	
	const [avatar, setAvatar]=useState('')
	const [avatarPreview, setAvatarPreview]=useState('/images/default_avatar.jpg')
	const [message, setMessage]=useState(null)

	
	const dispatch=useDispatch()
	
	const userAuth=useSelector(state=>state.userAuth)
	const {loading, error, userInfo, success}=userAuth
	
	const redirect=location.search ? location.search.split('=')[1] : '/'
	
	useEffect(()=>{
		if(userInfo){
			history.push(redirect)
		}
		if(success){
			const timer1=setTimeout(()=>{
				setMessage('Registered Successfully!')
			},1000)
			return ()=> clearTimeout(timer1)
		}
	},[history, userInfo, redirect, success])
	
	const submitHandler=e=>{
		e.preventDefault()
		if(password !== confirmPassword){
			setMessage('Passwords do not match')
		}else{
			const formData=new FormData()
			formData.set('name', name)
			formData.set('email', email)
			formData.set('password', password)
			formData.set('avatar', avatar)
			//dispatch(register(name, email, password))
			dispatch(register(formData))
		}
	}
	
	const onFileSelected=e=>{
		if(e.target.name==='avatar'){
			console.log(e.target.files[0])
			const reader=new FileReader()
			reader.onload=()=>{
				if(reader.readyState===2){
					setAvatarPreview(reader.result)
					setAvatar(reader.result)
				}
			}
			reader.readAsDataURL(e.target.files[0])
		}
	}
	
	return (
		
		<FormContainer>
			<h1>Sign Up</h1>
			{message && (<Message variant='success'>{message}</Message>)}
			{error && (<Message variant='danger'>{error}</Message>)}
			{loading && (<Loader />)}
			<Form onSubmit={submitHandler}
			 encType='multipart/form-data'>
			 
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='text' placeholder='Enter Name'
					value={name} onChange={e=>setName(e.target.value)}>
					</Form.Control>
				</Form.Group>
				
				<Form.Group controlId='email'>
					<Form.Label>Email</Form.Label>
					<Form.Control type='email' placeholder='Enter Email'
					value={email} onChange={e=>setEmail(e.target.value)}>
					</Form.Control>
				</Form.Group>		

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='Enter Password'
					value={password} onChange={e=>setPassword(e.target.value)}>
					</Form.Control>
				</Form.Group>				
				
				<Form.Group controlId='confirmPassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type='password' placeholder='Confirm Password'
					value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}>
					</Form.Control>
				</Form.Group>
				

				<Form.Group controlId='avatar'>
					<Figure>
						<Figure.Image
							alt="Avatar Preview"
							src={avatarPreview}
							width={160} height={150}
							roundedCircle
						/>
					</Figure>												
					<Form.File name='avatar' 
						custom
						label='Choose Avatar'
						accept='images/*'
						onChange={onFileSelected}
					>
					</Form.File>
					<span>Please select an avatar to be registered</span>
				</Form.Group>	
				
				<Button type='submit' variant='primary'
					disabled={loading? true : false}
				>Register</Button>
			</Form>
			
			<Row className='py-3'>
				<Col>
					Already Joined?{' '}
					<Link to={redirect? `/login?redirect=${redirect}`:'/login'}>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}
export default Register
/*
							
onChange={e=>setName(e.target.value)}

else{
			const timer=setTimeout(()=>{
				setMessage('Registered Unsuccessfully!')
			},1000)
			return ()=> clearTimeout(timer)
		}
		
					<!--<span>Please select an avatar to be registered</span>-->
*/