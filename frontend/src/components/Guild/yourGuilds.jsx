import React from 'react';
import _ from 'lodash';
import { Button, Container, Grid, Header, Icon, Image, Item, Label, Popup, Segment } from 'semantic-ui-react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';

class YourGuilds extends React.Component {

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

  updateStore = async (id) => {
    this.context.changeStore('guild_id', id);
    this.state.guildChosen = true;
  }

  handleViewButtonClick = async (id) => {
    await this.updateStore(id);
  }

  render() {
    if (this.state.guildChosen) return <Redirect to="/guildDetails" />;
    return (
      <Container>  
          <Label color='red'>
            <h2>Guilds, you are a leader of<br /></h2>
          </Label>
        {this.state.guildsLeader.map(x => (
          <Segment textAlign='left' inverted>
            <Item key={x._id} >
              <Image size='mini' src={x.flag} style={{ display: 'inline-block' }}></Image>
              <Item.Header style={{ color: 'white', display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                {x.name}
              </Item.Header>
              <Popup content='Type' trigger={
                <Label color='orange'>
                  {x.type}
                </Label>
              } />

              <Item.Description>
                <Segment.Group>
                  <Segment
                    inverted
                    textAlign='center'
                    color='purple'
                    style={{ padding: '2px 0px 0px 6px' }}>
                    <Header as='h5'>
                      Description
                        </Header>
                  </Segment>
                  <Segment>
                    {x.description}<br />
                  </Segment>
                </Segment.Group>
              </Item.Description>

              <Item.Extra>
                <Button
                  fluid
                  icon
                  color='green'
                  labelPosition='right'
                  onClick={async () => { await this.handleViewButtonClick(x._id) }}>
                  <Icon name='right chevron' />
                  View
                    </Button>
              </Item.Extra>
            </Item>
          </Segment>
        ))}

     
          <Label color='red'>
            <h2>Guilds in which you are a member<br /></h2>
          </Label>
        {this.state.guildsMember.map(x => (
          <Segment textAlign='left' inverted>
            <Item key={x._id} >
              <Image size='mini' src={x.flag} style={{ display: 'inline-block' }}></Image>
              <Item.Header style={{ color: 'white', display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                {x.name}
              </Item.Header>
              <Popup content='Type' trigger={
                <Label color='orange'>
                  {x.type}
                </Label>
              } />

              <Item.Description>
                <Segment.Group>
                  <Segment
                    inverted
                    textAlign='center'
                    color='purple'
                    style={{ padding: '2px 0px 0px 6px' }}>
                    <Header as='h5'>
                      Description
                        </Header>
                  </Segment>
                  <Segment>
                    {x.description}<br />
                  </Segment>
                </Segment.Group>
              </Item.Description>

              <Item.Extra>
                <Button
                  fluid
                  icon
                  color='green'
                  labelPosition='right'
                  onClick={async () => { await this.handleViewButtonClick(x._id) }}>
                  <Icon name='right chevron' />
                  View
                    </Button>
              </Item.Extra>
            </Item>
          </Segment>
        ))}
      </Container>
    );
  }
}

export default YourGuilds;    
