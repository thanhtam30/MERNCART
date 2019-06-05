import React, { Component } from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import {getupdateproduct,postupdateproduct,deleteimage} from '../../actions/productActions';
import {find} from '../../actions/producerActions';
import {Form,FormFeedback,Button,Input,Label,FormGroup,Col,Row} from 'reactstrap'
import {Link } from 'react-router-dom';
import PropTypes from 'prop-types';
class UpdateProduct extends Component {
constructor(props) {
    super(props);
    this.state={
        Name:'',
        Title:'',
        Price:'',
        Detail:'',
        Producer:'',
        Image:[],
        file:[],
        errors:{}
    }
}
componentDidMount(){
    if(this.props.match.params.id){
        this.props.getupdateproduct(this.props.match.params.id)
    }
    this.props.find();
}
onDeleteimage=(id,ha)=>{
    
this.props.deleteimage(id,ha);
}
onChange=e=>{
    this.setState({
        [e.target.name]:e.target.value
    })
}
onChangeimage=e=>{
    this.setState({
        file:e.target.files
        
    })
}
deletefile(id){
    if(window.confirm('Are you ready')){
        const images=[...this.state.file] ? [...this.state.file].filter((e)=>e!==id) : [];
    
        this.setState({
            file:images
        })
    }
    
    }
onSubmit=e=>{
    e.preventDefault();
    const {Name,Title,Price,Detail,Producer}=this.state;
    let formData=new FormData();
    for(let i=0;i<this.state.file.length;i++){
        formData.append('Image',this.state.file[i])
    }
    formData.append('Name',Name);
    formData.append('Title',Title);
   formData.append('Price',Price);
    formData.append('Detail',Detail);
    formData.append('Producer',Producer);
    
    this.props.postupdateproduct(this.props.match.params.id,formData,this.props.history);
}
componentWillReceiveProps = (nextProps) => {
    if(nextProps.errors){
        this.setState({
            errors: nextProps.errors
        })
    }
    if(nextProps.product.product){
        const {product}=nextProps.product
        
        product.Name=!_.isEmpty(product.Name)?product.Name:'';
        product.Price=!_.isEmpty(product.Price)?product.Price:'';
        product.Title=!_.isEmpty(product.Title)?product.Title:'';
        product.Detail=!_.isEmpty(product.Detail)?product.Detail:'';
        product.Producer=!_.isEmpty(product.Producer)?product.Producer:'';
        this.setState({
            Name:product.Name,
            Price:product.Price,
            Title:product.Title,
            Detail:product.Detail,
            Producer:product.Producer,
            Image:product.Image
        })
    }
}
    render() {
        const {errors}=this.state;
         
        const option=(this.props && this.props.producer.producer 
            && this.props.producer.producer.length)>0
        ?this.props.producer.producer.map((pro,index)=>{
            return  <option key={index} value={pro._id}>{pro.Name}</option>
        }
        ):<option/>

        const image=(this.state && this.state.Image && this.state.Image.length)>0
        ?this.state.Image.map((img,index)=>
        (<div key={index} className='imageproduct'>
            <img src={`../upload/product/${img}` }></img>
            <span 
                       onClick={this.onDeleteimage.bind(this,this.props.match.params.id,img)}><i  className='fa fa-window-close'></i></span>  
        </div>
        )):<div></div>
        console.log(this.state.Image)
        return (
            <div className="container">
            <br/>
            <h1>Update Product</h1>
            <br/>
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
                                  placeholder="Enter Name..."
                                  onChange={this.onChange}
                                  invalid={errors.Name ||errors.noName ? true : false}
                                  value={this.state.Name}
                              />
                              <br/>
                              <FormFeedback>{errors.Name||errors.noName ? errors.Name||errors.noName : null}</FormFeedback>         
                              
                      </Col>
                 
                 </Row>
                 <Row>
                 <Col  sm='6'>
                 <Label for="Price">Price</Label>
                      </Col>
                      <Col  sm='6'>
                      <Input
                                  type="text"
                                  name="Price"
                                  id="Price"
                                  
                                  onChange={this.onChange}
                                  value={this.state.Price}
                                  invalid={errors.Price ? true : false}
                              />
                              
                              <FormFeedback>{errors.Price? errors.Price: null}</FormFeedback>         
                              
                      </Col>
                 
                 </Row>
                 <br/>
                 <Row>
                 <Col  sm='6'>
                 <Label for="Title">Title</Label>
                      </Col>
                      <Col  sm='6'>
                      <Input
                                  type='text'
                                  name="Title"
                                  id="Title"
                                  placeholder="Enter Title..."
                                  onChange={this.onChange}
                                  invalid={errors.Title  ? true : false}
                                  value={this.state.Title}
                              />
                              <br/>
                              <FormFeedback>{errors.Title ? errors.Title : null}</FormFeedback>         
                              
                      </Col>
                 
                 </Row>
                 <Row>
                 <Col  sm='6'>
                 <Label for="Detail">Detail</Label>
                      </Col>
                      <Col  sm='6'>
                      <Input
                                  type='text'
                                  name="Detail"
                                  id="Detail"
                                  placeholder="Enter Detail..."
                                  onChange={this.onChange}
                                  invalid={errors.Detail  ? true : false}
                                  value={this.state.Detail}
                              />
                              <br/>
                              <FormFeedback>{errors.Detail ? errors.Detail : null}</FormFeedback>         
                              
                      </Col>
                 
                 </Row>
                 <Row>
                 <Col  sm='6'>
                 <Label for="Producer">Producer</Label>
                      </Col>
                      <Col  sm='6'>
                      <select  value={this.state.Producer }
                                 onChange={this.onChange}
                                 
                                 name="Producer"
                                 className='form-control'
                                 className={classnames("form-control", {
                                        'is-invalid': errors.Producer
                                })}
                        >
                        <option value=''>Choose.....</option>
                         {option}
                     </select>
                     {errors.Producer && (<div className='invalid-feedback'>{errors.Producer}</div>)}
                      </Col>
                 
                 </Row>
                 <br/>
                 <Row>
                 
                 <Col  sm='6'>
                 <Label for="Image">Choose image</Label>
                      </Col>
                      <Col  sm='6'>
                    <Input type='file'  name='file' 
                                    onChange={this.onChangeimage}
                                    multiple 
                                   className='form-control'></Input>
                      </Col>
                 
                 </Row>
                 <Row>
                 <Col  sm='6'>
                 <Label for="Image">Image Upload</Label>
                      </Col>
                      <Col  sm='6'>
                   {(this.state && this.state.file.length)>0?[...this.state.file].map((imgs,index)=>(
                       
                       <div key={index} className='imageproduct'>
                       <img  src={URL.createObjectURL(imgs)} />
                      <span 
                       onClick={this.deletefile.bind(this,imgs)}><i  className='fa fa-window-close'></i></span>
                       
                     
                       </div>
                   )):''}
                      </Col>
                 
                 </Row>
                 <br/>
                 <Row>
                 <Col  sm='6'>
                 <Label for="Image">Image</Label>
                      </Col>
                      <Col  sm='6'>
                   {image}
                      </Col>
                 
                 </Row>
                 <br/>
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
UpdateProduct.propTypes = {
    product:PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        producer:state.producer,
        product:state.product
    }
}
export default connect(mapStateToProps,{getupdateproduct,postupdateproduct,deleteimage,find})(UpdateProduct);