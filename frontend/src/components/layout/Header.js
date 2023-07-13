import {useDispatch, useSelector} from 'react-redux'
import {Route} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Image, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import SearchBox from './SearchBox'
import {logout} from '../../actions/userActions'

const Header=({history})=>{
	const dispatch=useDispatch()
	
	const userAuth=useSelector(state=>state.userAuth)
	const {userInfo}=userAuth
	const cart=useSelector(state=>state.cart)
	const {cartItems}=cart
	
	const getCartCount=()=>{
		return cartItems.reduce((q,item)=>q + Number(item.qty), 0)
  }
	
	const logoutHandler=()=>{
		dispatch(logout())
		//history.push('/')
	}
	//console.log(userInfo.avatar.url)
	return(
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Route render={({history})=><SearchBox history={history} />} />
						
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link className='mr-4'>
									<i className='fas fa-shopping-cart'></i> Cart ({getCartCount()})
								</Nav.Link>
							</LinkContainer>

							{userInfo? (
							<div className='d-flex'>
								<Image
										alt={userInfo && userInfo.name}
										src={userInfo.avatar && userInfo.avatar.url}
										width={25} height={25}
										className='mt-2'
										roundedCircle />
								<NavDropdown title={userInfo.name} id='username' className='ml-1'>	
									<LinkContainer to='/profile'>
										<NavDropdown.Item>My Profile</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/myorders'>
										<NavDropdown.Item>My Orders</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							</div>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu' className='mr-auto'>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}
export default Header
/*

*/