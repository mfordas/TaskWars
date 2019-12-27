import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import PublicRoute from '../PublicRoute';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react'
import Store from '../../Store';
const axios = require('axios');


class Login extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailTaken: false,
  }

  static contextType = Store;

  postUser = async () => {
    try {
      if (this.state.password !== this.state.confirmPassword) {
        throw 'Both passwords must be the same';
      }

      const res = await axios({
        method: 'post',
        url: '/api/users',
        data: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.status === 200) {
        document.location.href = '/register/confirm';
      } else {
        this.setState({ invalidData: true });
      }
    }
    catch (error) {
      console.error('Error Registration:', error);
      this.setState({ invalidData: true });
    }
  }

  checkEmail = async () => {
    await axios({
      url: 'api/users',
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      response.data.forEach((data) => {
        if (data.email === this.state.email) {
          this.setState({ emailTaken: true })
        }
      })
    }, (error) => {
      console.log(error);
    });
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    this.setState({ emailTaken: false })
    await this.checkEmail();
    if (this.state.emailTaken === false) {
      this.postUser();
    }
  }

  render() {

    return (
      <BrowserRouter>
        <Grid centered>
          <Segment compact textAlign='left'>
            <Form success error onSubmit={this.onButtonSubmit}>
              <Header textAlign='center'>Register</Header>
              <Form.Input
                label='Name'
                placeholder='Name'
                name='name'
                type='text'
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                fluid
              />
              {this.state.name.length < 3 && this.state.invalidData ? (
                <Message
                  error
                  header='The name is too short!'
                  content='Name must be longer than three characters!'
                />)
                : null
              }
              <Form.Input
                label='Email'
                placeholder='Email'
                name='email'
                type='email'
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                fluid
              />
              {this.state.emailTaken === true ?
                (<Message
                  error
                  header='Email taken!'
                  content='A user with this email address already exists!'
                />)
                : null}
              <Form.Input
                label='Password'
                placeholder='Password'
                name='password'
                type='password'
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
              <Form.Input
                label='Confirm Password'
                placeholder='Confirm Password'
                name='confirmPassword'
                type='password'
                value={this.state.confirmPassword}
                onChange={e => this.setState({ confirmPassword: e.target.value })}
              />
              {(this.state.password !== this.state.confirmPassword) && this.state.invalidData ? (
                <Message
                  error
                  header='Both passwords must be the same!'
                />)
                : null
              }
              {(this.state.password.length < 8 || this.state.confirmPassword.length < 8) && this.state.invalidData ? (
                <Message
                  error
                  header='The password is too short!'
                  content='Password must be longer than eight characters!'
                />)
                : null
              }
              <Grid textAlign='center' padded>
                <Button color='purple' type='submit'>Submit</Button>
              </Grid>
            </Form>
          </Segment>
        </Grid >
      </BrowserRouter>
    );
  }
}

export default Login;