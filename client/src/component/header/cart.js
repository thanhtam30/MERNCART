import React, { Component } from 'react';
import { Button, Nav,NavItem } from 'reactstrap';


class cart extends Component {
    render() {
        return (
        
            <Nav className="m-auto" navbar>
            <NavItem>
            <Button outline color="secondary">Cart({ (this.props.cartItemsNumber > 0)?(this.props.cartItemsNumber):(0)})</Button>{' '}

          
            </NavItem>
            
            
          </Nav>
         
                     
            
  
  

        
                   
        );
    }
}

export default cart;