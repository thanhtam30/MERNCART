import React, { Component } from 'react';
import {Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import {getproduct} from '../../actions/productActions'
import ProductItem from './Productitem';
class Listproduct extends Component {
    componentDidMount() {
        this.props.getproduct();
      }
    render() {
        const {product}=this.props.product
        let Listproduct;
      if(product===0){
          Listproduct=<Spinner/>
      }else{
          Listproduct=<ProductItem product={product}/>
      }
        return (
            <div>
               
                {Listproduct}
                    
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        product: state.product
        
    }
}
export default connect(mapStateToProps,{getproduct})(Listproduct);