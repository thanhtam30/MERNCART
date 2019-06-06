import React, { Component } from 'react';
import {  Nav } from 'reactstrap';
import {Link} from 'react-router-dom';

class cart extends Component {
    render() {
        return (
        
            <Nav className="ml-6" navbar>
         
            <Link to="/Cart"  className="btn btn-outline-secondary">
            Cart({ (this.props.cartItemsNumber > 0)?(this.props.cartItemsNumber):(0)})
            </Link>
          
            
            
            
          </Nav>
         
                     
            
  
  

        
                   
        );
    }
}

export default cart;