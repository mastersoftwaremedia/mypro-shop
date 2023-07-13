import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import {forgotUserPassword} from '../../actions/userActions'

const ForgotPassword=({history})=>{
	const [email, setEmail]=useState('')
	const dispatch=useDispatch()

	const userPass=useSelector(state=>state.userPass)
	const	{loading, error, message}=userPass
	
	
	const submitHandler=e=>{
		e.preventDefault()
		const formData=new FormData()
		formData.set('email', email)
		dispatch(forgotUserPassword(formData))
	}
	
	return(
		<Row>
			<Col md={12}>
				<h2>Forgot Password</h2>
				{message && <Message variant='success'>Check Your Email</Message>}
				{loading ? (<Loader />) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						
						<Form.Group controlId='email'>
							<Form.Label>Enter Email</Form.Label>
							<Form.Control type='email' 
								placeholder='Enter Email'
								value={email}
								onChange={e=>setEmail(e.target.value)}
							>							
							</Form.Control>
						</Form.Group>						
												
						<Button type='submit' variant='primary'
							disabled={loading? true : false}>
							Send Email
						</Button>
					</Form>
				)}
			</Col>
		</Row>
	)
}
export default ForgotPassword