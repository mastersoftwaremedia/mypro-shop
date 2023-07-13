import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../layout/Message'
import {resetUserPassword} from '../../actions/userActions'

const ResetPassword=({history, match})=>{
	const [password, setPassword]=useState('')
	const [confirmPassword, setConfirmPassword]=useState('')
	
	const dispatch=useDispatch()

	const userPass=useSelector(state=>state.userPass)
	const	{error, success}=userPass
	
	useEffect(()=>{
		if(success){
			history.push('/login')
		}
	},[history, success])
	
	const submitHandler=e=>{
		e.preventDefault()
		const formData=new FormData()
		formData.set('password', password)
		formData.set('confirmPassword', confirmPassword)
		dispatch(resetUserPassword(match.params.token, formData))
	}
	
	return(
		<Row>
			<Col md={12}>
				<h2>Reset Password</h2>
				{error && <Message variant='danger'>Password has not been reset</Message>}
				{success && <Message variant='success'>Password has been reset</Message>}				
				<Form onSubmit={submitHandler}>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control 
							type='password' placeholder='Enter Password'
							value={password} onChange={e=>setPassword(e.target.value)}>
						</Form.Control>
					</Form.Group>				
				
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control 
							type='password' placeholder='Confirm Password'
							value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}>
						</Form.Control>
					</Form.Group>					
			
												
					<Button type='submit' variant='primary'>
						Send Password
					</Button>
				</Form>
			</Col>
		</Row>
	)
}
export default ResetPassword