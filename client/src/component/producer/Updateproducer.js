import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getupdateproducer,postupdateproducer} from '../../actions/producerActions';
import {Form,FormFeedback,Button,Input,Label,FormGroup,Col,Row} from 'reactstrap';
import _ from 'lodash';

class Updateproducer extends Component {
    constructor(props) {
        super(props);
        this.state=({
            name:'',
            errors:{}
        })
    }
    
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.getupdateproducer(this.props.match.params.id);
        }
        
    }
    onChange=e=>{
            this.setState({
                [e.target.name]:e.target.value
            })
    }
    onSubmit=e=>{
        const {Name}=this.state;
        e.preventDefault();
        const update=({
            Name
        })
        this.props.postupdateproducer(this.props.match.params.id,update,this.props.history)
    }
    componentWillReceiveProps(nextprops){
        if (nextprops.errors) {
            this.setState({
              errors: nextprops.errors
            });
          }
                if(nextprops.producer.producer){
            const {producer}=nextprops.producer;
            producer.Name = !_.isEmpty(producer.Name) ? producer.Name : '';
            this.setState({
                    Name:producer.Name
            })
            
        }
    }
    render() {
        const {errors}=this.state;
        return (
            <div>
               <Form onSubmit={this.onSubmit} >
                                     <Row>
           <Col  sm='6'>
           <Label for="Name">Name</Label>
                </Col>
                <Col  sm='6'>
                <Input
                            type='text'
                            name="Name"
                            id="Name"
                            value={this.state.Name||''}
                            onChange={this.onChange}
                            invalid={errors.Name  ? true : false}
                        />
                        <FormFeedback>{errors.Name  ? errors.Name  : null}</FormFeedback>
                </Col>
           </Row>
           <br/>                      <FormGroup  row>
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
        producer: state.producer,
        errors:state.errors
    }
}
export default connect(mapStateToProps,{getupdateproducer,postupdateproducer})(Updateproducer);