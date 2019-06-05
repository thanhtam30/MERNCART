import React, { Component } from 'react';
import {connect} from 'react-redux';
import {add} from '../../actions/producerActions';
import {Form,FormFeedback,Button,Input,Label,FormGroup,Col,Row} from 'reactstrap'
import MenuAdmin from '../header/menuadmin';
class addProducer extends Component {
constructor(props) {
    super(props);
    this.state={
        Name:'',
     
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
    const {Name}=this.state;
   
    
    const newProducer=({Name})
    this.props.add(newProducer,this.props.history);
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
            <div className="container">
            <br/>
            <MenuAdmin/>
            <h1>Add Producer</h1>
            <br/>
           <Form onSubmit={this.onSubmit} >
           <Row>
                 <Col  sm='6'>
                 <Label for="Name">Name</Label>
                      </Col>
                      <Col  sm='6'>
                      <Input
                                  type="text"
                                  name="Name"
                                  id="Name"
                                  placeholder="Enter Name..."
                                  onChange={this.onChange}
                                  invalid={errors.Name ||errors.noName ? true : false}
                              />
                              
                              <FormFeedback>{errors.Name||errors.noName ? errors.Name||errors.noName : null}</FormFeedback>         
                              
                      </Col>
                 
                 </Row>
            
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
        errors: state.errors
    }
}
export default connect(mapStateToProps,{add})(addProducer);