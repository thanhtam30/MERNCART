import React, { Component } from 'react';
import { Container, Row, Col , Button, Form,Input,FormFeedback} from 'reactstrap';
import {connect} from 'react-redux';
import StarRatings  from 'react-star-ratings'
import {rating,clearerrors} from '../../actions/productActions';
class Rating extends Component {
    constructor(props) {
        super(props);
        this.state={
            Rating:0,
            errors:{}
        }
        this.changeRating=this.changeRating.bind(this)
    }
   componentDidMount(){
       this.props.clearerrors();
   }
    onSubmit=(e)=>{
        e.preventDefault();
        const { id } = this.props;
        
        const { user } = this.props.user;
        
       const newrating={
        Rating:this.state.rating,
        name:user.fullName,
        user:user.id
       }
       
        this.props.rating(id,newrating);
      this.setState({
          errors:{}
      })
        }
    
    componentWillReceiveProps=(nextProps)=>{
        this.setState({
            errors:nextProps.errors
        })
    }
    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
      }
    
    render() {
        const { errors } = this.state;

      
           
        return (
            <Container>
           
          

         
            
           <Form onSubmit={this.onSubmit}>
           <Row>
           <Input type="hidden"  name="user" value={this.props.user.user.id}
                invalid={errors.nouser ? true : false}
           />
           <FormFeedback>{errors.nouser ? errors.nouser : null}</FormFeedback>   
           </Row>
                
          
           <Row>
            <Col sm={6}>  <StarRatings
          rating={this.state.rating}
          starRatedColor="yellow"
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
          starDimension="30px"
         
        /></Col>
        <Col sm={6}><Button>Post</Button></Col>
           </Row>
           </Form>
           
          </Container>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        user:state.user,
        product:state.product
    }
}
export default connect(mapStateToProps,{rating,clearerrors})(Rating);