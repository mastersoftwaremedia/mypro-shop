import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Figure, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../layout/Message'
import Loader from '../layout/Loader'
import FormContainer from '../layout/FormContainer'
import {createProduct} from '../../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../../constants/productConstants'

const ProductNew=({history})=>{

	const [name, setName]=useState('')
	const [description, setDescription]=useState('')
	const [price, setPrice]=useState(0)
	const [brand, setBrand]=useState('')
	const [category, setCategory]=useState('')
	const [countInStock, setCountInStock]=useState(0)
	const [images, setImages]=useState([])
	const [imagesPreview, setImagesPreview]=useState([])	
	
	const dispatch=useDispatch()
	
	const productCreate=useSelector(state=>state.productCreate)
	const {loading, error, success}=productCreate
	const userAuth=useSelector(state=>state.userAuth)
	const {userInfo}=userAuth
	
	useEffect(()=>{
		if(!userInfo && !userInfo.isAdmin){
			history.push('/login')
		}
		if(success){
			dispatch({type:PRODUCT_CREATE_RESET})
			history.push('/admin/productlist')
		}
	},[dispatch, history, success, userInfo])
	
	const submitHandler=e=>{
		e.preventDefault()
		const formData=new FormData()
		formData.set('name', name)
		formData.set('description', description)
		formData.set('price', price)
		formData.set('brand', brand)
		formData.set('category', category)
		formData.set('countInStock', countInStock)
		images.forEach(image=>{
			formData.append('images', image)
		})
		dispatch(createProduct(formData))
	}
	
	const onFileSelected=e=>{
		const files=Array.from(e.target.files)
		console.log(files)
		setImagesPreview([])
		setImages([])
		
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
				<h1>Create Product Info</h1>
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
							New
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}
export default ProductNew