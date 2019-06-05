import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/userActions';
import {getCart} from '../../actions/cartActions';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import Cart from './cart'
import Search from './search';
class header extends Component {
  componentDidMount(){
    this.props.getCart();
  }
  onLogout(e){
    e.preventDefault();
    this.props.logoutUser();
  }
    render() {
      const {user,isAuthenticated}=this.props.user;
      const usermenu=(
        <Nav className="ml-auto" navbar>
           
         
           <Cart cartItemsNumber={this.props.totalQty}/>
           <NavItem>
          <NavLink href="/Signin">SignIn</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Login">Login</NavLink>
        </NavItem>
        <NavItem>
       
        </NavItem>
        
      </Nav>
       
      )
      const menuuser=(
        <Nav className="ml-auto" navbar>
       <Cart cartItemsNumber={this.props.totalQty}/>
        <NavItem>
          <NavLink href="/Login" onClick={this.onLogout.bind(this)}>({user.fullName}) Logout</NavLink>
        </NavItem>
      
        
      </Nav>
        
      )
        return (
          <Navbar color="light" light  expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          
          <Collapse  navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Search/>
              </NavItem>
              
              
            </Nav>
            
            
            {(isAuthenticated)?menuuser:usermenu}
            {(user.userType==='admin')?<Link to='/Product'>Admin</Link>:''}
          </Collapse>
        </Navbar>
            
        );
    }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    totalQty: state.cart.totalQty
  }
}
export default connect(mapStateToProps,{logoutUser,getCart})(header);