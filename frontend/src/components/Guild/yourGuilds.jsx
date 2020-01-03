import React from 'react';
import _ from 'lodash';
import { Button, Container, Header, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { NavLink, Route, Redirect} from 'react-router-dom';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';

const guildCategories = [
  { key: 0, text: 'All' },
  { key: 1, text: 'Physical' },
  { key: 2, text: 'Mental' },
  { key: 3, text: 'Utility' }
];

  state = {
    guildChosen: false,
    name: '',
    guildsLeader: [],
    guildsMember: [],
  }

  static contextType = Store;

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
        resultsLeader: body
      }
    )

    const response2 = await fetch(`/api/guilds/members/${id}`, setHeaders());
    const body2 = await response2.json();
    this.setState(
      {
        resultsMember: body2
      }
    )
  }

  componentDidMount() {
    this.fetchGuild();
  }

  updateStore = async (id) => {
    this.context.changeStore('guild_id', id);
    this.state.guildChosen = true;
  }

  handleViewButtonClick = async (id) => {
    await this.updateStore(id);
  }

  render() {
    if(this.state.guildChosen) return <Redirect to="/guildDetails" />;
    return (
      <Grid>
        <Grid.Column mobile={16} computer={10}>
          <Header as='h2'>Guilds, you are a leader of</Header>
          <Item.Group divided>
            {this.state.guildsLeader.map(x => (
              <Item key={x._id} >
                <Item.Image size='tiny' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png' />
                <Item.Content>
                  <Item.Header as='a'>{x.name}</Item.Header>
                  <Item.Meta>
                    <span className='type'>{x.type}</span>
                    <Button color='green' floated='right' onClick={async ()=>{await this.handleViewButtonClick(x._id)}}>
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
                    <Button color='green' floated='right' onClick={async ()=>{await this.handleViewButtonClick(x._id)}}>
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

export default MenuGuildFilter;