import React, { Component } from 'react';
import {connect} from 'react-redux';
import {detail,clearerrors} from '../../actions/productActions';
import Productdetailitem from './productdetaailitem';
import {Spinner} from 'reactstrap'
class productdetail extends Component {
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.detail(this.props.match.params.id);
        }
     
        this.props.clearerrors();
    }
    render() {
        const {products}=this.props.product
        // console.log(this.props.product.products.Name)
        let item=null;
        if(products===0){
            item=<Spinner/>
        }else{
            item=<Productdetailitem products={products}/>
        }
        return (
            <div>
               {item}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product
    }
}
export default connect(mapStateToProps,{detail,clearerrors})(productdetail);