import {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import {listMyOrders} from '../../actions/orderActions'

const MyOrder=({history})=>{
	const dispatch=useDispatch()
	const userAuth=useSelector(state=>state.userAuth)
	const {userInfo}=userAuth
	
	const orderMyList=useSelector(state=>state.orderMyList)
	const {loading, error, orders}=orderMyList
	
	useEffect(()=>{
		if(!userInfo){
			history.push('/login')
		}else{
			dispatch(listMyOrders())
		}
	},[dispatch, history, userInfo])
	
	return(
		<Row>
			<Col md={12}>
				<h2>My Orders</h2>
				{loading ? (<Loader />) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Table striped bordered hover responsive className='table-md'>
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
						{orders.map(order=>(
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.createdAt.substring(0,10)}</td>
								<td>{order.totalPrice}</td>
								<td>{order.isPaid ? (
									order.paidAt.substring(0,10)
									): (
									<i className='fas fa-times' style={{color:'red'}}></i>
									)}
								</td>
								<td>{order.isDelivered ? (
									order.deliveredAt.substring(0,10)
								) : (
									<i className='fas fa-times' style={{color:'red'}}></i>
								)}</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>Details</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	)
}
export default MyOrder