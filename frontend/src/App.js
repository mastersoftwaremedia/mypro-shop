import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Profile from './components/auth/Profile'
import ForgotPassword from './components/auth/ForgotPassword'
import ResetPassword from './components/auth/ResetPassword'
import MyOrder from './components/order/MyOrder'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/Shipping'
import Payment from './components/cart/Payment'
import PlaceOrder from './components/cart/PlaceOrder'
import FinishedOrder from './components/order/FinishedOrder'
import UserList from './components/admin/UserList'
import UserEdit from './components/admin/UserEdit'
import ProductList from './components/admin/ProductList'
import ProductNew from './components/admin/ProductNew'
import ProductEdit from './components/admin/ProductEdit'
import OrderList from './components/admin/OrderList'

function App(){
	return(
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/myorders' component={MyOrder} />
					<Route path='/order/:id' component={FinishedOrder} />
					<Route path='/placeorder' component={PlaceOrder} />
					<Route path='/payment' component={Payment} />
					<Route path='/shipping' component={Shipping} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
					<Route path='/password/forgot' component={ForgotPassword} />
					<Route path='/password/reset/:token' component={ResetPassword} exact />					
					
					<Route path='/profile' component={Profile} />
					<Route path='/product/:id' component={ProductDetails} />
					<Route path='/cart/:id?' component={Cart} />

					<Route path='/admin/userlist' component={UserList} />	
					<Route path='/admin/user/:id/edit' component={UserEdit} />					
					<Route path='/admin/productlist' component={ProductList} exact />
					<Route path='/admin/productlist/:pageNumber' component={ProductList} exact />			
					<Route path='/admin/product/new' component={ProductNew} />
					<Route path='/admin/product/:id/edit' component={ProductEdit} />
					<Route path='/admin/orderlist' component={OrderList} />						
					
					<Route path='/search/:keyword' component={Home} exact />
					<Route path='/page/:pageNumber' component={Home} exact />
					<Route path='/search/:keyword/page/:pageNumber' component={Home} exact />
					<Route path='/' component={Home} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}
export default App
/*			
*/