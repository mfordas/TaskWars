import React from 'react';
import _ from 'lodash';
import { Button, Container, Grid, Header, Icon, Image, Item, Label, Loader, Popup, Segment } from 'semantic-ui-react';
import { NavLink, Route, Redirect } from 'react-router-dom';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';

class YourGuilds extends React.Component {

  state = {
    leaderAvatar: '',
    guildChosen: false,
    name: '',
    guildsLeader: [],
    guildsMember: [],
    loading: true,
  }

  static contextType = Store;

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.getData(body.character_id);

    const responseAvatar = await (await fetch(`/api/characters/${body.character_id}`, setHeaders())).json();
    this.setState({ leaderAvatar: responseAvatar.avatar })
  }

  getData = async (id) => {
    const response = await fetch(`/api/guilds/leader/${id}`, setHeaders());
    const body = await response.json();
    body.sort((a, b) => { return (a.name > b.name) })
    this.setState(
      {
        guildsLeader: body
      }
    )

    const response2 = await fetch(`/api/guilds/members/${id}`, setHeaders());
    const body2 = await response2.json();
    body2.sort((a, b) => { return (a.name > b.name) })
    this.setState(
      {
        guildsMember: body2
      }
    )
    this.setState({loading: false });
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
        {this.state.loading && (
          <Loader active size='huge' content='Loading...' inverted />
        )}
        {this.state.guildsLeader.map(x => (
          <Segment textAlign='left' inverted>
            <Item key={x._id} >
              <Image size='mini' src={x.flag} style={{ display: 'inline-block' }}></Image>
              <Item.Header style={{ color: 'white', display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                {x.name}
              </Item.Header>
              <Label color='orange'>
                {x.type}
              </Label>
              <Label color='red' attached='top right' as='a' image>
                <img src={this.state.leaderAvatar} />
                Leader
              </Label>
              <Item.Description>
                <Segment.Group>
                  <Segment
                    inverted
                    textAlign='center'
                    color='brown'
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
                  color='brown'
                  labelPosition='right'
                  onClick={async () => { await this.handleViewButtonClick(x._id) }}>
                  <Icon name='right chevron' />
                  View
                    </Button>
              </Item.Extra>
            </Item>
          </Segment>
        ))}

        <Header as={'h1'}>
          {' '}
        </Header>
        {this.state.guildsMember.map(x => (
          <Segment textAlign='left' inverted>
            <Item key={x._id} >
              <Image size='mini' src={x.flag} style={{ display: 'inline-block' }}></Image>
              <Item.Header style={{ color: 'white', display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                {x.name}
              </Item.Header>
              <Label color='orange'>
                {x.type}
              </Label>
              <Label color='grey' attached='top right' >
                Member
              </Label>

              <Item.Description>
                <Segment.Group>
                  <Segment
                    inverted
                    textAlign='center'
                    color='brown'
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
                  color='brown'
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
