import React, { useContext } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react'
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import ErrorMessage from '../ErrorMessage';
import Store from '../../Store';

class GuildCreate extends React.Component {

  state = {
    name: '',
    nameTaken: false,
    leader: null,
  }

  postGuild = async () => {
    try {
      const res = await axios({
        url: 'api/guilds',
        method: 'post',
        data: {
          name: this.state.name,
          leader: localStorage.id,
        },
        headers: setHeaders(),
      });

      if (res.status === 200) {
        document.location.href = "/guild";
      } else {
        this.setState({ invalidData: true });
      }
    }
    catch (error) {
      console.error('Error Guild Creation:', error);
      this.setState({ invalidData: true });
    }
  }

  checkName = async () => {
    await axios({
      url: 'api/guilds',
      method: 'get',
      headers: setHeaders(),
    }).then((response) => {
      response.data.forEach((data) => {
        if (data.name === this.state.name) {
          this.setState({ nameTaken: true })
        }
      })
    }, (error) => {
      console.log(error);
    });
  }

  onButtonSubmit = async e => {
    e.preventDefault();
    this.setState({ nameTaken: false })
    await this.checkName();
    if (this.state.nameTaken === false) {
      this.postGuild();
    }
  }

  nameValidate = (e) => {
    if (this.state.name.length < 5 && this.state.invalidData) {
      return <ErrorMessage message='Name must be longer than five characters!' />
    } else if (this.state.nameTaken === true) {
      return <ErrorMessage message='A guild with this name already exists!' />
    }
    else { return null }
  }

  render() {

    return (
      <Grid centered>
        <Segment compact textAlign='left' inverted>
          <Form error inverted onSubmit={this.onButtonSubmit}>
            <Header inverted>Create a guild!</Header>
            <Form.Input
              error={this.nameValidate()}
              label="Your guild's name"
              placeholder='Name'
              name='name'
              type='name'
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
            />
            <Grid textAlign='center' padded>
              <Button color='purple' type='submit'>Submit</Button>
            </Grid>
          </Form>
        </Segment>
      </Grid >
    )
  }
}

export default GuildCreate;    
