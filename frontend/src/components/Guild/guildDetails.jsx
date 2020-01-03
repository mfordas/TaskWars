import React from 'react';
import _ from 'lodash';
import { Button, Container, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import setHeaders from '../../utils/setHeaders';
import { get } from 'mongoose';

class YourGuilds extends React.Component {

  state = {
    name: '',
    membersId: [],
    membersName: [],
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    const id = localStorage.getItem('currentGuild');
    this.getData(id);
  }

  getData = async (id) => {
    let response = await fetch(`/api/guilds/${id}`, setHeaders());
    let body = await response.json();
    this.setState(
      {
        membersId: body.members
      }
    )

    this.state.membersId.map(async (elem) => {
      const res = await fetch(`/api/users/character/${elem}`, setHeaders())
        .then(response => response.json());
      this.state.membersName.push(res.name);
    })
    console.log(this.state.membersName)
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
            {this.state.membersId.map(x => (
              <Item key={x} >
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
