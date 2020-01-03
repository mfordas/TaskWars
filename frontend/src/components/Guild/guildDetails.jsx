import React from 'react';
import _ from 'lodash';
import { Button, Container, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { NavLink} from 'react-router-dom';
import setHeaders from '../../utils/setHeaders';

class YourGuilds extends React.Component {

  state = {
    name: '',
    guildsLeader: [],
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    const id = localStorage.getItem('currentGuild');
    console.log(id);
    this.getData(id);
  }

  getData = async (id) => {
    const response = await fetch(`/api/guilds/${id}`, setHeaders());
    const body = await response.json();
    this.setState(
      {
        guildsLeader: body.members
      }
    )
    
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <Container>
        <Segment textAlign='left'>
          <Header as='h2'>Użytkownicy</Header>
          <Item.Group divided>
            {this.state.guildsLeader.map(x => (
              <Item key={x._id} >
                <Item.Content>
                  <Item.Header as='a'>{x}</Item.Header>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </Container>
    );
  }
}

export default YourGuilds;    
