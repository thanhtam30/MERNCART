import React, { Component } from 'react';
import {connect} from 'react-redux';
import {index} from '../../actions/productActions';
import IndexItem from '../index/indexitem';
import _ from 'lodash'
class indexProduct extends Component {
    componentDidMount(){
        this.props.index();
    }
    render() {
      
       
        const {keyword}=this.props;
       
       
       let products = _.filter(this.props.products,x => {
        if(x.Name) {
            return x.Name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        } else {
            return '';
        }
        });
        
    var elmTasks = products.map((products,index) => {
        return (
            
            <IndexItem
               key={index}
                products={products}
               
            />
        )
    });
        return (
            <div>
              {elmTasks}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        user:state.user,
        keyword:state.search
    }
}
export default connect( mapStateToProps,{index})(indexProduct);