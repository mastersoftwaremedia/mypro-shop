import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../layout/Message'
import {addToCart, removeFromCart} from '../../actions/cartActions'

const Cart=({match, location, history})=>{
	const dispatch=useDispatch()
	const cart=useSelector(state=>state.cart)
	const {cartItems}=cart
	
	const removeFromCartHandler=id=>{
		dispatch(removeFromCart(id))
	}
	const checkOutHandler=()=>{
		history.push('/login?redirect=shipping')
	}
	console.log(cartItems)
	return(
		<>
			<Row>
				<Col md={8}>
					<h1>Shopping Cart</h1>
					{cartItems.length===0 ? (
						<Message>Your cart is empty 
							<Link to='/'>Go Back</Link>
						</Message>
					) : (
						<ListGroup variant='flush'>
						{cartItems.map(item=>(
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={3}>
										<Image src={item.image} alt={item.name} 
										height='90' width='115'
										fluid />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>
											{item.name}
										</Link>
									</Col>
									<Col md={2}>
										{item.price}
									</Col>
									<Col md={2}>
										<Form.Control as='select'
											value={item.qty}
											onChange={e=>dispatch(addToCart(item.product, Number(e.target.value)))}
										>
										{[...Array(item.countInStock).keys()].map(x=>(
											<option key={x+1} value={x+1}>
												{x+1}
											</option>
										))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button type='button' variant='light'
											onClick={()=>removeFromCartHandler(item.product)}
										>	
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
						</ListGroup>
					)}
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Subtotal ({cartItems.reduce((q,item)=>q+item.qty, 0)}) items</h2>
								${cartItems.reduce((p,item)=>p + item.price*item.qty, 0).toFixed(2)}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button type='button' className='btn-block'
									disabled={cartItems.length===0} 
									onClick={checkOutHandler}
								>
									Proceed To Checkout
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}
export default Cart