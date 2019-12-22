import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'
const axios = require('axios');

class RegisterContent extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  stateError = {
    nameError: '',
    emailError: '',
    passwordError: '',
  };

  postData = async (state) => {
    if (this.state.password !== this.state.confirmPassword) {
      alert('Passwords are not the same!');
      return
    }
    delete this.state["confirmPassword"];

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
      <Grid centered>
        <Segment compact textAlign='left'>
          <Form onSubmit={this.onButtonSubmit}>
            <Header textAlign='center'>Register</Header>
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
              onChange={this.handleChange}
            />
            <Grid centered padded>
              <Form.Field color='purple' control={Button} >Submit</Form.Field>
            </Grid>
          </Form>
        </Segment>
      </Grid>
    );
  }
}

export default RegisterContent;