import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
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
    delete this.state["invalidData"];
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
      console.error('Error Login:', error);
      this.setState({ invalidData: true });
    }
  }

  render() {
    if (this.context.isLogged) return <Redirect to="/" />;

    return (
      <Grid centered>
        <Segment compact textAlign='left'>
          <Form error onSubmit={this.onButtonSubmit}>
            <Header textAlign='center'>Login</Header>
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
            <Grid textAlign='center' padded>
              <Button color='purple' type='submit'>Submit</Button>
            </Grid>
            {this.state.invalidData ? (
              <Message
                error
                header='Invalid email or password'
              />) : null}
          </Form>
        </Segment>
      </Grid >
    );
  }
}

export default Login;