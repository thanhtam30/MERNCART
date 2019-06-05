import React, { Component } from 'react';
import { Button, Form, FormGroup,  Input, Col,FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import {comment} from '../../actions/productActions';
import PropTypes from 'prop-types';
class commentProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            Comment:'',
            errors:{}
        }
    }
    onChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onSubmit=e=>{
        e.preventDefault();
        const {id}=this.props;
        const {user}=this.props.user
        const {Comment}=this.state;
        const newCommnet={
            Comment,User:user.id,Name:user.fullName
        }
        this.props.comment(id,newCommnet);
        this.setState({
            Comment:''
        })
    }
    componentWillReceiveProps=(nextprops)=>{
        if(nextprops.errors){
            this.setState({
                errors:nextprops.errors
            })
        }
    }
    render() {
        const {errors}=this.state;
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup row>
                   
                    
                    <Input type='textarea' name='Comment' 
                    value={this.state.Comment} onChange={this.onChange}
                    invalid={errors.Comment  ? true : false}
                    ></Input>
                    <FormFeedback>{errors.Comment ? errors.Comment : null}</FormFeedback>         
                        
                    </FormGroup>
                    <FormGroup check row>
                    <Col sm={{ size: 1, offset: 3 }}>
                        <Button>Post</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

commentProduct.propTypes = {
    product:PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
const mapStateToProps = (state) => {
    return {
        user: state.user,
        product:state.product,
        errors:state.errors
    }
}
export default connect(mapStateToProps,{comment})(commentProduct);