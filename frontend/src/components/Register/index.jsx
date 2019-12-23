import React from 'react';
import {
  Button,
  Form,
  Header,
  Segment
} from 'semantic-ui-react'
const axios = require('axios');

class RegisterContent extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    // confirmPassword: ''
  }

  postData = async (state) => {
    const data = state;
    try {
      const res = await axios({
        method: 'post',
        url: '/api/users', 
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        alert('Account created, check your email');
      }
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
    const { name,
      email,
      password,
      confirmPassword
    } = this.state

    return (
      <Segment compact>
        <Form onSubmit={this.onButtonSubmit}>
          <Header>Register</Header>
          <Form.Input
            label='Name'
            placeholder='Name'
            name='name'
            type='text'
            value={name}
            onChange={this.handleChange}
          />

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

          <Form.Input
            label='Confirm Password'
            placeholder='Confirm Password'
            name='confirmPassword'
            type='password'
            value={confirmPassword}
            // onChange={this.handleChange}
          />
          <Form.Field color='purple' control={Button} >Submit</Form.Field>
        </Form>
      </Segment>
    );
  }
}

export default RegisterContent;