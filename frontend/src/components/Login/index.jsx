import React from 'react';
import {
  Button,
  Form,
  Header,
  Segment
} from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';
const axios = require('axios');

class RegisterContent extends React.Component {

  state = {
    email: '',
    password: '',
  }

  logIn = () => {
    console.log('User Logged In');
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGZkZjIwODEwZDJjZDA1ZmM3YTRjYTAiLCJuYW1lIjoiT2xlazMiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTc2OTIzNjU2fQ.XqNPMtn4Ta9kAl5uxTLJxtRytH-a5n2Xf7RcDWHBM-U');
    window.location.reload(true);
  }

  postData = async (state) => {
    const data = state;
    try {
      const res = await axios({
        method: 'post',
        url: '/api/auth', 
        data: data,
        headers: setHeaders()
      });
      console.log(`Success: ${res.data}`);
      this.logIn();
    } catch (error) {
      console.error('Error Registration:', error);
    }
  }

  onButtonSubmit = () => {
    console.log(this.state)
    this.postData(this.state)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  render() {
    const {
      email,
      password,      
    } = this.state

    return (
      <Segment compact>
        <Form onSubmit={this.onButtonSubmit}>
          <Header>Login</Header>

          <Form.Input
            label='Email'
            placeholder='Email'
            name='email'
            type='email'
            value={email}
            onChange={this.handleChange}
          />

          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            value={password}
            onChange={this.handleChange}
          />

          <Form.Field color='purple' control={Button} >Submit</Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default RegisterContent;