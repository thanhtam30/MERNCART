import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

class menuadmin extends Component {
    render() {
        return (
            <div>
        
        
        <Nav >
         
          <NavItem>
            <NavLink href="/Product">List Product</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/AddProduct">Add Product</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Producer">List Producer</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/AddProducer">Add Producer</NavLink>
          </NavItem>
          
        </Nav>
       
      </div>
    
        );
    }
}

export default menuadmin;