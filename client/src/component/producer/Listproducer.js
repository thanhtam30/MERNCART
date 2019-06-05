import React, { Component } from 'react';
import {Spinner} from 'reactstrap'
import {connect} from 'react-redux'
import {find} from '../../actions/producerActions'
import ProducerItem from './Produceritem';
class Listproducer extends Component {
    componentDidMount() {
        this.props.find();
      }
    render() {
        const {producer}=this.props.producer
        
        
        let Listproducer;
      if(producer===0){
          Listproducer=<Spinner/>
      }else{
          Listproducer=<ProducerItem producer={producer}/>
      }
        return (
            <div>
               
                {Listproducer}
                    
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        producer: state.producer
        
    }
}
export default connect(mapStateToProps,{find})(Listproducer);