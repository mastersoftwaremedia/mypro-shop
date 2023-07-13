import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import FormContainer from '../layout/FormContainer'
import {login} from '../../actions/userActions'

const Login=({history, location})=>{
	const [email, setEmail]=useState('')
	const [password, setPassword]=useState('')
	
	const dispatch=useDispatch()
	
	const userAuth=useSelector(state=>state.userAuth)
	const {loading, error, userInfo}=userAuth
	
	const redirect=location.search ? location.search.split('=')[1] : '/'
	
	useEffect(()=>{
		if(userInfo){
			history.push(redirect)
		}
	},[history, userInfo, redirect])
	
	const submitHandler=e=>{
		e.preventDefault()
		dispatch(login(email, password))
	}
	
	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && (<Message variant='danger'>{error}</Message>)}
			{loading && (<Loader />)}
			<Form onSubmit={submitHandler}>
				
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
				
				
				<Button type='submit' variant='primary'>Login</Button>
			</Form>
			
			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect? `/register?redirect=${redirect}`:'/register'}>Register</Link>
				</Col>
				<Col>
					<Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}
export default Login