import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Loader from './layout/Loader'
import Message from './layout/Message'
import ProductCard from './product/ProductCard'
import Paginate from './layout/Paginate'
import Meta from './layout/Meta'
import {getlistProducts} from '../actions/productActions'

const Home=({match})=>{
	const keyword=match.params.keyword
	const pageNumber=match.params.pageNumber || 1
	const dispatch=useDispatch()
	const productList=useSelector(state=>state.productList)
	const {loading, error, products, pages, page}=productList
	
	useEffect(()=>{
		dispatch(getlistProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])
	
	return(
		<>
			<Meta />
			<Link to='/' className='btn btn-light'>Go Back</Link>
			<h1>Latests Products</h1>
			{loading ? (<Loader />) : error? 
				(<Message variant='danger'>{error}</Message>) : (
					<>
						<Row>
						{products.map(product=>(
							<Col sm={12} md={6} lg={4} xl={3} key={product._id} className='align-items-stretch d-flex'>
								<ProductCard product={product} />
							</Col>
						))}
						</Row>
						<Paginate pages={pages} page={page} 
						keyword={keyword ? keyword : ''} />
					</>
				)}
		</>
	)
}
export default Home