import React, { Component } from 'react';
import {connect} from 'react-redux';
import Rating from './raiting';
import Comment from './comment';
import moment from 'moment';
import Reactmoment from 'react-moment';
import {Link} from 'react-router-dom'
import StarRatings  from 'react-star-ratings'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
var NumberFormat = require('react-number-format');;
class productdetaailitem extends Component {
    render() {
        const {products}=this.props.product;
        const {isAuthenticated}=this.props.user;
        

        const ratings=(products.Rating &&products.Rating.length) > 0 
        ?products.Rating.reduce((Rating, sum) =>(
           Rating += (sum.Rating)/(products.Rating.length)
        ), 0):0;
          
        return (
            <div>
            <div className='row'>
            <div className='col sm-6'>
            <Carousel showStatus={false} showIndicators	={false} showArrows={false}>
			
			{(products.Image &&products.Image.length) > 0 ?products.Image.map((image,index)=>
		{ return <div key={index}>
      <img src={`../upload/product/${image}`}></img>
    </div>}):''}
			</Carousel>  
            </div>
            <div className='col sm-6'>
            <table className="table table-bordered">
  <thead>
    <tr>
      
     
    </tr>
  </thead>
  <tbody>
  <tr>
      <th scope="row">Name</th>
      <td>{products.Name}</td>
     
    </tr>
    <tr>
      <th scope="row">Price</th>
      <td>
      <NumberFormat value={products.Price} displayType={'text'} thousandSeparator={true} renderText={value => <div>{value}</div>} />
      </td>
  
    </tr>
    <tr>
      <th scope="row">Title</th>
      <td>{products.Title}</td>
     
    </tr>
    <tr>
      <th scope="row">Detail</th>
      <td>{products.Detail}</td>
  
    </tr>
    <tr>
      <th scope="row">Rating</th>
        <th>
        <StarRatings
					          starRatedColor="yellow"
        rating={ratings}
        starDimension="30px"
        
      />
        </th>
  
    </tr>
  </tbody>
</table>
          
            </div>
         
            </div>
            {(isAuthenticated? 
            <div>
            <div className='row'>
                <div className='col sm-4'>
                    <label>Rating</label>
                </div>
                  <div className='col sm-8'>
                  <Rating id={products._id} Rating={products.Rating}/>
                  </div>
                </div>
                <div className='row'>
                <div className='col sm-4'>
                    <label>Comment</label>
                </div>
                  <div className='col sm-8'>
                  <Comment id={products._id}/>
                  </div>
                </div>
            </div>
          :<div>
                  <h1>You must be logged in to be evaluated <Link to='/Login'>Login</Link></h1>
                </div>)}
           
           
         
                <div>
               
    {(products && products.Comment && products.Comment.length)>0?products.Comment.map((comment,index)=>{
      return <div key={index} className='row'>
          <div className='col sm-4'>({comment.Name})(<Reactmoment format='DD/MM/YYY'>{comment.Date}</Reactmoment>) </div>
      <div className='col sm-8'>{comment.Comment}</div>
       </div>
    }):''}
 
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product,
        user:state.user
    }
}
export default connect(mapStateToProps,{})(productdetaailitem);