import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Loader from '../layout/Loader'
import Message from '../layout/Message'
import Meta from '../layout/Meta'
import {getProduct} from '../../actions/productActions'
import {addToCart} from '../../actions/cartActions'
//import {PRODUCT_DETAILS_RESET} from '../../constants/productConstants'

const ProductDetails=({history, match})=>{
	const [qty, setQty]=useState(1)
	
	const dispatch=useDispatch()
	
	const productDetails=useSelector(state=>state.productDetails)
	const {loading, error, product}=productDetails

	//const userAuth=useSelector(state=>state.userAuth)
	//const {userInfo}=userAuth
	
	useEffect(()=>{
		if(product && match.params.id !== product._id){
			dispatch(getProduct(match.params.id))
		}
		//return ()=>dispatch({type:PRODUCT_DETAILS_RESET})
	},[dispatch, match, product])

	const addToCartHandler=()=>{
		dispatch(addToCart(product._id, qty))
		history.push('/cart')
	}

	return(
		<>
			<Link to='/' className='btn btn-light my-3'>Go Back</Link>
			{loading ? (<Loader />) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
						{product.images && product.images.map(image=>(
						<div key={image.public_id}>
							<Image src={image.url} alt={product.name} fluid />
						</div>
						))}
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									Price: ${product.price}
								</ListGroup.Item>
								<ListGroup.Item>
									description: ${product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>
									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty:</Col>
												<Col>
													<Form.Control as='select'
														value={qty}
														onChange={e=>setQty(e.target.value)}
													>
														{[...Array(product.countInStock).keys()].map(x=>(
															<option key={x+1} value={x+1}>
																{x+1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}
									<ListGroup.Item>
										<Button className='btn-block'
											type='button'
											disabled={product.countInStock===0}
											onClick={addToCartHandler}
										>
											Add To Cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}
export default ProductDetails