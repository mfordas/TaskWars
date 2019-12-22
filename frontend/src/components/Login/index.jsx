import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  Header,
  Segment
} from 'semantic-ui-react'
import jwt from 'jwt-decode';

import Store from '../../Store';
const axios = require('axios');

class Login extends React.Component {

  state = {
    email: '',
    password: '',
  }

  static contextType = Store;

  onButtonSubmit = async e => {
    e.preventDefault();
    const data = this.state;
    try {
    const res = await axios({
      method: 'post',
      url: '/api/auth', 
      data: data,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (res.status === 200) {
        const token = res.headers["x-auth-token"];
        localStorage.setItem('token', token);
        localStorage.setItem('id', jwt(token)._id);
        this.context.changeStore('isLogged', true);
        this.setState({ isLogged: true });
      } else {
        this.setState({ invalidData: true });
      }
    }
   catch (error) {
    console.error('Error Registration:', error);
  }
}

  render() {
    if (this.context.isLogged) return <Redirect to="/" />;

    return (
      <Segment compact>
        <Form onSubmit={this.onButtonSubmit}>
          <Header>Login</Header>

          <Form.Input
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />

          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />

          <Button color='purple' type='submit'>Submit</Button>
        </Form>
      </Segment>
    );
  }
}

export default Login;