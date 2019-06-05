import React, { Component } from "react";
import {connect} from 'react-redux';
import {searchproduct} from '../../actions/searchActions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class ProductSearchControl extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        keyword : ''
    }
}

onHandleChange = (event) => {
    this.setState({
        keyword : event.target.value
    });
}

onSearch = () => {
  
    this.props.searchproduct(this.state.keyword);
}



  render() {
    return (
      <Form inline>
    
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        
        <Input type="text"    value={this.state.keyword}
                        type="text"
                        className="form-control"
                        placeholder="Nhập từ khóa..."
                        onChange={this.onHandleChange}/>
      </FormGroup>
      <Button className="btn btn-primary" type="button" onClick={this.onSearch}>Search</Button>
    </Form>
 
              
          
    );
  }
}

export default connect(null,{searchproduct})(ProductSearchControl);
