import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ConfirmRegister from './confirmRegister';
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
  }

  static contextType = Store;

  onButtonSubmit = async e => {
    e.preventDefault();
    const data = this.state;

    try {
      if (this.state.password !== this.state.confirmPassword) {
        throw 'Both passwords must be the same';
      }

      delete this.state["invalidData"];
      delete this.state["confirmPassword"];

      const res = await axios({
        method: 'post',
        url: '/api/users',
        data: data,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (res.status === 200) {
        document.location.href = '/register/confirm';
        // alert('Account created, check your email');
      } else {
        this.setState({ invalidData: true });
      }
    }
    catch (error) {
      console.error('Error Registration:', error);
      this.setState({ invalidData: true });
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
              <Form.Input
                label='Email'
                placeholder='Email'
                name='email'
                type='email'
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
                fluid
              />
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
              {((this.state.name.length < 3) && (this.state.password !== this.state.confirmPassword) && this.state.invalidData) || this.state.invalidData ? (
                <Message
                  error
                  header='One of the following errors occurred'
                  list={['Name must be longer than three characters!',
                    'A user with this email address already exists!',
                    'Both passwords must be the same!']}
                />)
                : null
              }
              <Grid textAlign='center' padded>
                <Button color='purple' type='submit'>Submit</Button>
              </Grid>
            </Form>
          </Segment>
        </Grid >

        <Switch>
          <Route exact path="/register/confirm" component={ConfirmRegister} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Login;