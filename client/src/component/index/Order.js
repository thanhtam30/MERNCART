import React, { Component } from 'react';
import {connect} from 'react-redux';
import {clearCart,OrderCart} from '../../actions/cartActions';
import {  Row, Col , Button, Form, Label, Input, FormFeedback,FormGroup} from 'reactstrap';
class Order extends Component {
    constructor(props) {
        super(props);
        this.state={
            Name:'',
            Phone:'',
            Address:'',
            errors:{}
        }
    }
    
   
    onSubmit=e=>{
        e.preventDefault();
        const {Name,Phone,Address}=this.state;
        const {user}=this.props.user
            const newOrder={
                Name,Phone,Address,User:user.id
            }
           
            this.props.OrderCart(newOrder,this.props.history);
            this.props.clearCart();
    }
    onChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
      
    }
    render() {
        const {errors}=this.state;
        
        return (
            <div>
            <h1>Order</h1>
            <br/>
                  <Form onSubmit={this.onSubmit}>
           <Row>
           <Col  sm='6'>
                    <Label>Payment address</Label>
                </Col>
                <Col  sm='6'>
                <Input
                            type="text"
                            name="Address"
                            id="Address"
                            placeholder="Address.."
                            onChange={this.onChange}
                            invalid={errors.Address  ? true : false}
                        />
                         <FormFeedback>{errors.Address ? errors.Address : null}</FormFeedback>
                </Col>
           </Row>
           <br/>
           <Row>
           <Col  sm='6'>
                    <Label>Payment phone</Label>
                </Col>
                <Col  sm='6'>
                <Input
                            type="text"
                            name="Phone"
                            id="Phone"
                            placeholder="Phone.."
                            onChange={this.onChange}
                             invalid={errors.Phone ? true : false}
                        />
                         <FormFeedback>{errors.Phone ? errors.Phone : null}</FormFeedback>
                </Col>
           </Row>
           <br/>
           <Row>
           <Col  sm='6'>
                    <Label>Payment Name</Label>
                </Col>
                <Col  sm='6'>
                <Input
                            type="text"
                            name="Name"
                            id="Name"
                            placeholder="Name.."
                            onChange={this.onChange}
                             invalid={errors.Name ? true : false}
                        />
                         <FormFeedback>{errors.Name ? errors.Name : null}</FormFeedback>
                </Col>
           </Row>
           <br/>
           <FormGroup checked row>
                        <Col sm={{offset:8}}>
                          <Button className='btn btn-success'>Save</Button>
                        </Col>
                      </FormGroup>
           </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        errors: state.errors
    }
}
export default connect(mapStateToProps,{clearCart,OrderCart})(Order);