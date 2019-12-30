import React from 'react';
import _ from 'lodash';
import { Button, Container, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';

class YourGuilds extends React.Component {

  state = {
    name: '',
    guildsLeader: [],
    guildsMember: [],
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.getData(body.character_id);
  }

  getData = async (id) => {
    const response = await fetch(`/api/guilds/leader/${id}`, setHeaders());
    const body = await response.json();
    this.setState(
      {
        guildsLeader: body
      }
    )

    const response2 = await fetch(`/api/guilds/members/${id}`, setHeaders());
    const body2 = await response2.json();
    this.setState(
      {
        guildsMember: body2
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
          <Header as='h2'>Guilds, you are a leader of</Header>
          <Item.Group divided>
            {this.state.guildsLeader.map(x => (
              <Item key={x._id} >
                <Item.Image size='tiny' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png' />
                <Item.Content>
                  <Item.Header as='a'>{x.name}</Item.Header>
                  <Item.Meta>
                    <span className='type'>{x.type}</span>
                    <Button color='green' floated='right'>
                      View
                  <Icon name='right chevron' />
                    </Button>
                  </Item.Meta>
                  <Item.Description>{x.description}</Item.Description>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>

        <Segment textAlign='left'>
          <Header as='h2'>Guilds in which you are a member</Header>
          <Item.Group divided>
            {this.state.guildsMember.map(x => (
              <Item key={x._id} >
                <Item.Image size='tiny' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png' />
                <Item.Content>
                  <Item.Header as='a'>{x.name}</Item.Header>
                  <Item.Meta>
                    <span className='type'>{x.type}</span>
                    <Button color='green' floated='right'>
                      View
                  <Icon name='right chevron' />
                    </Button>
                  </Item.Meta>
                  <Item.Description>{x.description}</Item.Description>
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
