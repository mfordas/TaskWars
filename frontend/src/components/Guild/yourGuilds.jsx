import React, { useContext } from 'react';
import {
  Container,
  Form,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react'
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import ErrorMessage from '../ErrorMessage';
import Store from '../../Store';

class YourGuilds extends React.Component {

  state = {
    name: '',
  }

  checkName = async () => {
    await axios({
      url: 'api/guilds',
      method: 'get',
      headers: setHeaders(),
    }).then((response) => {
      response.data.forEach((data) => {
        if (data.leader === localStorage.id) {
          this.setState({ guildExist: true })
          this.setState({ name: data.name })
        }
      })
    }, (error) => {
      console.log(error);
    });
  }

  render() {
    this.checkName();
    return (
      <Grid centered>
        <Form>
          <Segment textAlign='left'>
            <Header>Guilds, you are a leader of</Header>
            <List>
            <Container>{this.state.name}</Container>
            </List>
          </Segment>

          <Segment  textAlign='left'>
            <Header>Guilds in which you are a member</Header>
          </Segment>
        </Form>
      </Grid >
    )
  }
}

export default YourGuilds;    
