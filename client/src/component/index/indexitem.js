import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToCart,updateCart} from '../../actions/cartActions';
class mainproductitem extends Component {
    handleCart(){
        
        const products = [...this.props.cart, {
            
          _id:this.props.products._id,
          Name:this.props.products.Name,
          Image: this.props.products.Image,
          Price:this.props.products.Price,
          qty:1
        }]
         // CHECK IF CART IS EMPTY
         if(this.props.cart.length > 0) {
          // CART IS NOT EMPTY
          let _id = this.props.products._id;
    
          let cartIndex = this.props.cart.findIndex(function(cart){
            return cart._id === _id;
          })
          // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
          if (cartIndex === -1){
            this.props.addToCart(products);
          } else {
            // WE NEED TO UPDATE QUANTITY
            this.props.updateCart(_id, 1, this.props.cart);
          }
    
        } else {
          // CART IS EMPTY
          this.props.addToCart(products);
        }
    
      }
  
    render() {
      
        const {products}=this.props;
  
        return (
            
           
           
            <div className='product'>
            <h1>{this.props.products.Name}</h1>
            <img src={this.props.products.Image.length>0? `./upload/product/${this.props.products.Image[0]}`:'./upload/noimage/noimage.jpg'} className='product_image'></img>
             <div className='middle'>
<Link className='btn btn-default' to={`/Productdetail/${this.props.products._id}` }>Detail</Link>

 <button onClick={this.handleCart.bind(this)} className='btn btn-default'>Buy now</button>
 </div>
            
           

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart,
        product:state.product
     
    }
}
export default connect(mapStateToProps,{addToCart,updateCart})(mainproductitem);