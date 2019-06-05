import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/userActions";
import { Button, Form, Col,Row,FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import Protyper from 'prop-types';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }


  componentDidMount() {
    if (this.props.user.isAuthenticated) {
      this.props.history.push('/');
    }
  }  
  componentWillReceiveProps(nextProps) {
  if(nextProps.user.isAuthenticated){
    this.props.history.push('/')
  }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
      <br/>
      <h1>Sign In</h1>
      <br/>
     <Form onSubmit={this.onSubmit} >
     <Row>
           <Col  sm='6'>
           <Label for="email">Email</Label>
                </Col>
                <Col  sm='6'>
                <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter email..."
                            onChange={this.onChange}
                            invalid={errors.email ||errors.noemail ? true : false}
                        />
                        <br/>
                        <FormFeedback>{errors.email ||errors.noemail ? errors.email ||errors.noemail : null}</FormFeedback>         
                </Col>
           
           </Row>
           <Row></Row>
           <Row>
           <Col  sm='6'>
           <Label for="password">password</Label>
                </Col>
                <Col  sm='6'>
                <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password..."
                            onChange={this.onChange}
                            invalid={errors.password ||errors.nopassword ? true : false}
                        />
                        <FormFeedback>{errors.password ||errors.nopassword ? errors.password ||errors.nopassword : null}</FormFeedback>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
