import React,{Component} from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './component/commont/PrivateRoute';
import { Provider } from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode'
import { setCurrentUser, logoutUser } from "./actions/userActions";
import store from './store';
import Navbar from './component/header/header'
import Signin from './component/user/signin'
import Login from './component/user/login'
import AddProducer from './component/producer/addProducer';
import UpdateProducer from './component/producer/Updateproducer';
import Producer from './component/producer/Listproducer';
import AddProduct from './component/product/AddProduct';
import Updateproduct from './component/product/Updateproduct';
import Product from './component/product/Listproduct';

import Index from './component/index/index';
import Productdetail from './component/index/productdetail';
import Cart from './component/index/cart';
import Order from './component/index/Order';
import NotFound from './component/not-found/NotFound';
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./Login";
  }
}
class App extends Component {

  render() {
    return (
     
      <Provider store={store}>
      <Router>
        <Navbar/>
          <div className="App">
          <Route  exact path='/' component={Index} ></Route>
          <Route  exact path='/Signin' component={Signin} ></Route>
          <Route  exact path='/Login' component={Login} ></Route>
                <Switch>
                <PrivateRoute  exact path='/AddProducer' component={AddProducer}></PrivateRoute>
              </Switch> 
                <Switch>
                <PrivateRoute  exact path='/AddProduct' component={AddProduct}></PrivateRoute>
              </Switch>
                <Switch>
                <PrivateRoute  exact path='/Product' component={Product}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/Producer' component={Producer}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/Updateproduct/:id' component={Updateproduct}></PrivateRoute>
              </Switch>
              <Switch>
                <PrivateRoute exact path='/UpdateProducer/:id' component={UpdateProducer}></PrivateRoute>
              </Switch>
             
             
                <Route  exact path='/Productdetail/:id' component={Productdetail}/>
                <Route  exact path='/Cart' component={Cart}/>
                
                <Switch>
                <PrivateRoute exact path="/Order" component={Order} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
           </div>
        </Router>
      </Provider>
    );
  }
}

export default App;