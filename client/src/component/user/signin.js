import React, { Component } from 'react';
import { Button, Form, Col,FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { connect } from 'react-redux';
import { signin } from '../../actions/userActions';
import PropTypes from 'prop-types';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullName: "",
            phone: "",
            DOB: "",
            image:'',
            file:'',
            errors: {},
            imagePreviewUrl: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onChangeimage=(e)=>{
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            image: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }
    onSubmit = (e) => {
        e.preventDefault()
               const {fullName,password,email,DOB,image,phone} =this.state
               console.log(image)
               let formData=new FormData();
               formData.append('fullName',fullName);
               formData.append('password',password);
               formData.append('email',email);
               formData.append('DOB',DOB);
               formData.append('image',image);
               formData.append('phone',phone)
      
             this.props.signin(formData,this.props.history)
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
      
    }

    render() {
        const { errors } = this.state;
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} width='200px' height='200px'/>);
        } else {
          $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        return (
            <div className="container text-left">
                <h1>SIGN IN </h1>

                <Form onSubmit={this.onSubmit} >
                <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Enter email..."
                            onChange={this.onChange}
                            invalid={errors.email ||errors.noemail ? true : false}
                        />
                        <FormFeedback>{errors.email||errors.noemail ? errors.email||errors.noemail : null}</FormFeedback>
                    </FormGroup>
                    
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password..."
                            onChange={this.onChange}
                            invalid={errors.password ? true : false}
                        />
                        <FormFeedback>{errors.password ? errors.password : null}</FormFeedback>
                    </FormGroup>
                 
                    <FormGroup>
                        <Label for="fullName">fullName</Label>
                        <Input
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter fullName..."
                            onChange={this.onChange}
                            invalid={errors.fullName ? true : false}
                        />
                        <FormFeedback>{errors.fullName ? errors.fullName : null}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">phone</Label>
                        <Input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Enter phone..."
                            onChange={this.onChange}
                            invalid={errors.phone ||errors.nophone ? true : false}
                        />
                        <FormFeedback>{errors.phone||errors.nophone ? errors.phone||errors.nophone: null}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="DOB">DOB</Label>
                        <Input
                            type="date"
                            name="DOB"
                            id="DOB"
                            placeholder="Enter DOB..."
                            onChange={this.onChange}
                            invalid={errors.DOB ? true : false}
                        />
                        <FormFeedback>{errors.DOB ? errors.DOB : null}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Upload file</Label>
                        <Input accept='image/*'
                            type="file"
                            name="image"
                            id="image"
                            placeholder="Enter file..."
                            onChange={this.onChangeimage}
                            invalid={errors.noimage ||errors.noimage? true : false}
                        />
                          <FormFeedback>{errors.noimage ||errors.noimage? errors.noimage ||errors.noimage: null}</FormFeedback>
                       {$imagePreview}
                    </FormGroup>
                   
                    
        

                    <FormGroup check row >
                    <Col sm={{offset:2 }}>
                    <Button>Submit</Button>
                    </Col>

                    
                    </FormGroup>
                    
                </Form>
            </div>
        );
    }
}
Signin.propTypes = {
    signin: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, {  signin })(Signin);