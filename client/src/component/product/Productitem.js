import React, { Component } from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import {deleteproduct} from '../../actions/productActions';
import {connect} from 'react-redux';
import MenuAdmin from '../header/menuadmin';
class ProductItem extends Component {
  onDelete=(id)=>{
    this.props.deleteproduct(id)
  }
    render() {
           
        let product =  (this.props && this.props.product &&this.props.product.length) > 0 ?this.props.product.map((pro,index) => (   
           
            <tr key={index}>
                    <td>{index+1}</td>
                <td>{pro.Name}</td>
                <td>
                {/* {pro.Image.map((image,index)=>( */}
                  <img key={index} src={pro.Image.length>0? `./upload/product/${pro.Image[0]}`:'./upload/noimage/noimage.jpg'} width='100px' height='100px'></img>
                {/* ))} */}
                </td>
                <td>
              
                <Link className='btn btn-danger' to={`/Updateproduct/${pro._id}`}>Edit</Link>
                </td>
                <td>
                <Link className='btn btn-danger' to={'/Product'}  onClick={this.onDelete.bind(this,pro._id)}>Delete</Link>
                 
                
                 
                </td>
              </tr>
            )):<tr></tr>
        return (
            <div>
              <h1>Product</h1>
              <MenuAdmin/>
                     <div className='row'>
              <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        
         
      {product}
        </tbody>
      </Table>  </div>
            </div>
          
               
           
        );
    }
}

export default connect(null,{deleteproduct})(ProductItem);