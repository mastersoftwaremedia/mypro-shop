import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const Product=({product})=>{
	//console.log(product.images[0])
	return(
	<Card className='my-3 p-3 rounded'>
		<Link to={`/product/${product._id}`}>
			<Card.Img src={product.images[0].url} variant='top' />
		</Link>
		<Card.Body>
			<Link to={`/product/${product._id}`}>
				<Card.Title as='div'>
					<strong>{product.name}</strong>
				</Card.Title>
			</Link>
			<Card.Text as='h3'>
				{product.price}
			</Card.Text>
		</Card.Body>
	</Card>
)
}
export default Product
/*

*/