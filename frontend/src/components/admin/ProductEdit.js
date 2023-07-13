import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Figure, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import FormContainer from '../layout/FormContainer'
import {getProduct, updateProduct} from '../../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../../constants/productConstants'


const ProductEdit=({match, history})=>{
	
	const [name, setName]=useState('')
	const [description, setDescription]=useState('')
	const [price, setPrice]=useState(0)
	const [brand, setBrand]=useState('')
	const [category, setCategory]=useState('')
	const [countInStock, setCountInStock]=useState(0)
	const [oldImages, setOldImages]=useState([])
	const [images, setImages]=useState([])
	const [imagesPreview, setImagesPreview]=useState([])
	
	const dispatch=useDispatch()
	
	const productDetails=useSelector(state=>state.productDetails)
	const {loading, error, product}=productDetails
	const productUpdate=useSelector(state=>state.productUpdate)
	const {
		loading:loadingUpdate, 
		error:errorUpdate, 
		isUpdated
	}=productUpdate
	
	const productId=match.params.id
	
	useEffect(()=>{
		if(product && product._id !== productId){
				dispatch(getProduct(productId))
		}else{
			setName(product.name)
			setDescription(product.description)
			setPrice(product.price)
			setBrand(product.brand)
			setCategory(product.category)
			setCountInStock(product.countInStock)
			setOldImages(product.images)
		}
		if(isUpdated){
			history.push('/admin/productlist')
			alert('Product updated successfully')
			dispatch({type:PRODUCT_UPDATE_RESET})
		}	
	},[dispatch, history, isUpdated, product, productId])
	
	const submitHandler=e=>{
		e.preventDefault()
		const formData=new FormData()
		formData.set('name', name)
		formData.set('description', description)
		formData.set('price', price)
		formData.set('brand', brand)
		formData.set('category', category)
		formData.set('countInStock', countInStock)
		images.forEach(image=>{formData.append('images', image)})
		dispatch(updateProduct(product._id, formData))
	}
	
	const onFileSelected=e=>{
		const files=Array.from(e.target.files)
		setImagesPreview([])
		setImages([])
		setOldImages([])
		
		files.forEach(file=>{
			const reader=new FileReader()
			reader.onload=()=>{
				if(reader.readyState===2){
					setImagesPreview(oldArray=> [...oldArray, reader.result])
					setImages(oldArray=> [...oldArray, reader.result])
				}
			}
			reader.readAsDataURL(file)			
		})
	}
	console.log(images)
	return(
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product Info</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading? (<Loader />) : error? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}
					encType='multipart/form-data' 
					>

						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={e=>setName(e.target.value)}
							></Form.Control>
						</Form.Group>
					
						<Form.Group controlId='description'>
							<Form.Label>description</Form.Label>
							<Form.Control
								as="textarea" rows={3} 
								placeholder='Enter description'
								value={description}
								onChange={e=>setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>					
					
						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter price'
								value={price}
								onChange={e=>setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>					
					
						<Form.Group controlId='images'>
							<Form.Label>Product Image</Form.Label>
							<Form.File 
								name='images'
								custom 
								multiple
								label='Choose Product Images'
								onChange={onFileSelected}
							>
							</Form.File>
						</Form.Group>
		
						{oldImages && oldImages.map((img, i)=>(
							<Figure key={i}>
								<Figure.Image alt={img.url}
									src={img.url}
									width={160} height={150}
									fluid
								/>
							</Figure>
						))}	
		
						{imagesPreview.map((img, i)=>(
							<Figure key={i}>
								<Figure.Image alt='New Product Preview'
									src={img}
									width={160} height={150}
									fluid
								/>
							</Figure>
						))}				
				
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>									
					
					
						<Button type='submit' variant='primary'
							disabled={loading? true : false}
						>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}
export default ProductEdit