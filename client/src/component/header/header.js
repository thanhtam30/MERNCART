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
  ButtonGroup } from 'reactstrap';
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
           
         <ButtonGroup>
         <Cart cartItemsNumber={this.props.totalQty}/>
           <NavItem>
           <Link to="/Signin" className='btn btn-link'><i class="fa fa-user-plus"></i></Link>
        </NavItem>
        <NavItem>
          <Link  to="/Login" className='btn btn-link'><i class="fa fa-sign-in"></i>

</Link>
        </NavItem>
        <NavItem>
       
        </NavItem>
         </ButtonGroup>
         
        
      </Nav>
       
      )
      const menuuser=(
        <Nav className="ml-auto" navbar>
       <Cart cartItemsNumber={this.props.totalQty}/>
        <NavItem>
          <Link className='btn btn-link'  to="/Login" onClick={this.onLogout.bind(this)}>({user.fullName}) Logout</Link>
        </NavItem>
      
        
      </Nav>
        
      )
        return (
          <Navbar  style={{background:'#e3f2fd'}}  expand="md">
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