import React, { Component } from 'react';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom';
import {deleteproducer} from '../../actions/producerActions';
import {connect} from 'react-redux';
import MenuAdmin from '../header/menuadmin';
class Produceritem extends Component {
  onDelete=(id)=>{
    this.props.deleteproducer(id)
  }
    render() {
           
        let producer =  (this.props && this.props.producer &&this.props.producer.length) > 0 ?this.props.producer.map((exp,index) => (   
           
            <tr key={index}>
                    <td>{index+1}</td>
                <td>{exp.Name}</td>
                
                <td>
                <Link className='btn btn-danger' to={`/UpdateProducer/${exp._id}`}>Edit</Link>
                </td>
                <td>
                <Link className='btn btn-danger' to={'/Producer'}  onClick={this.onDelete.bind(this,exp._id)}>Delete</Link>
                 
                
                 
                </td>
              </tr>
            )):<tr></tr>
        return (
          <div>
            <h1>Producer</h1>
            <MenuAdmin/>
            <div className='row'>
           
             
              
            
            
            
                <Table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        
         
      {producer}
        </tbody>
      </Table>  
            </div>
            </div>
      
          
        );
    }
}

export default connect(null,{deleteproducer})(Produceritem);