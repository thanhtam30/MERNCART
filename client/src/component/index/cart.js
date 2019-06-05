import React from 'react';
import {connect} from 'react-redux';
import {Card, Col, Row,  Button, ButtonGroup} from 'reactstrap';
import {Link} from 'react-router-dom'
import {deleCart, updateCart, getCart} from '../../actions/cartActions';
import {bindActionCreators} from 'redux';
var NumberFormat = require('react-number-format');
class Cart extends React.Component{
  componentDidMount(){
    this.props.getCart();
  }
  onDelete(_id){
    // Create a copy of the current array of books
    const CartProduct = this.props.cart;
    // Determine at which index in books array is the book to be deleted
    const indexToDelete=CartProduct.findIndex((cart)=>cart._id===_id)
  // let carsanpham=[...CartProduct.slice(0,indexToDelete),...CartProduct.slice(indexToDelete+1)]
    //use slice to remove the book at the specified index
    let cartAfterDelete = [...CartProduct.slice(0, indexToDelete), ...CartProduct.slice(indexToDelete + 1)]

    this.props.deleCart(cartAfterDelete);
  }
  onIncrement(_id){
    this.props.updateCart(_id, 1, this.props.cart);
  }
  onDecrement(_id, qty){
   
    
    if(qty >1){
      this.props.updateCart(_id, -1, this.props.cart);
      // this.props.onDelete(this.props.cart._id)
    }
  }


  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  renderEmpty(){
    return(<div>No Cart</div>)
  }

  renderCart(){

    const cartItemsList = this.props.cart.map((cartArr)=>{
      return(
        <Card key={cartArr._id}>
             <Row>
            <Col  sm={4}>
          
            <h6> {cartArr.Name}</h6>
            </Col>
            <Col  sm={2}>
            <NumberFormat value={cartArr.Price} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
              
            </Col>
         
            <Col  sm={6}>
              <ButtonGroup style={{minWidth:'300px'}}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.qty)} >-</Button>
                <Button >{cartArr.qty} </Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id, cartArr.qty)} >+</Button>
                
                <Button onClick={this.onDelete.bind(this, cartArr._id)} >DELETE</Button>
              </ButtonGroup>
            </Col>
            <br/>
          </Row>
      </Card>
      )
    }, this)
    return(
      <Card>
        <Card>
        {cartItemsList}
        </Card>
        <Card>
        <Row >
       
       <Col sm={2}>
      Sum:
       </Col>
       <Col sm={8}>
       <NumberFormat value={this.props.totalAmount} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
       </Col>
       <Col sm={2}>
       VNĐ
       </Col>
       </Row>
      </Card>
      <Card>
      <Row>
        <Col >
        
        <Row sm={10} className='mr-auto'></Row>
        <Row sm={10} className='mr-auto'></Row>
       <Link to='/Order'>Order</Link>
       
        </Col>
          
        </Row>
      </Card>
      </Card>
    
    
   
  

  
     
      
    
       
      
      
    )
  }
}
function mapStateToProps(state){
  return{
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleCart:deleCart,
    updateCart:updateCart,
    getCart:getCart
  }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
