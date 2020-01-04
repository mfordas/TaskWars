import React from 'react';
import _ from 'lodash';
import { Button, Form, Grid, Header, Icon, Input, Item, Label, Segment, Image, Container } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios'
import Store from '../../Store';
import { Redirect, NavLink } from 'react-router-dom';
import TopPortal from '../Utils/TopPortal';


class GuildJoin extends React.Component {
  constructor(props) {
    super(props);
    this.portalRef = React.createRef();
    this.state = {
      guild_id: '',
      name: '',
      leader: '',
      leaderName: '',
      current_fight: {},
      isLeader: false,
      membersId: [],
      membersName: [],
      leaderName: '',
      charId: 'All',
      charName: [],
      Tags: '',
      results: [],
      charResult: [],
      open: false,
    }
  }

  static contextType = Store;

  getGuild = async () => {
    await axios({
      url: `api/guilds/${this.state.guild_id}`,
      method: 'get',
      headers: setHeaders()
    }).then((response) => {
      this.setState({ name: response.data.name, leader: response.data.leader })
    }, (error) => {
      console.log(error);
    });
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.checkLeadership(body.character_id);
    this.getData(this.state.guild_id);
  }

  getData = async (id) => {
    let response = await fetch(`/api/guilds/${id}`, setHeaders());
    let body = await response.json();
    this.setState(
      {
        membersId: body.members
      }
    )

    for (let i = 0; i < this.state.membersId.length; i++) {
      const res = await fetch(`/api/users/character/${this.state.membersId[i]}`, setHeaders())
        .then(response => response.json());
      const charRes = await fetch(`/api/characters/${this.state.membersId[i]}`, setHeaders())
        .then(response => response.json())

      this.setState({
        membersName: [...this.state.membersName, res],
        charName: [...this.state.charName, charRes],
      })
    }

    const res = await fetch(`/api/characters/${this.state.leader}`, setHeaders())
      .then(response => response.json());
    this.setState({
      leaderName: res
    })
  }

  findMember = async () => {
    const res = await fetch(`/api/users/search/${this.state.charId}&${this.state.tags}`, setHeaders())
      .then(response => response.json());
    this.setState({ results: res });

    for (let i = 0; i < this.state.results.length; i++) {
      const resChar = await fetch(`/api/characters/${res[i].character_id}`, setHeaders())
        .then(response => response.json());
      this.setState({
        charResult: [...this.state.charResult, resChar],
      })
    }
  }

  addMember = async (id) => {
    const memberToInsert = {
      "name": `${this.state.name}`,
      "members": [`${id.character_id}`],
    };
    const res = await axios.put(`/api/guilds/${this.state.guild_id}/members`, memberToInsert);
    if (res.status == 200)
      this.portalRef.current.handleOpen();
      this.findMember();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false });
  }

  checkLeadership = async (character_id) => {
    if (character_id === this.state.leader) {
      this.setState({ isLeader: true });
    }
  }

  componentDidMount = async () => {
    await this.setState({ guild_id: this.context.guild_id }); 
    await this.getGuild();
    await this.fetchUser();
  }

  onSearchButtonClick = (event) => {
    this.findMember();
  }

  ButtonClick = async (id) => {
    await this.addMember(id);
  }

  onSearchChange = (event) => {
    const str = event.target.value.toLowerCase();
    this.setState({ tags: str.split(" ").join("_") });
  }

  render() {
    return (
      <Segment inverted>
        <Image></Image>
        <Item.Header as={'h1'}>{this.state.name} </Item.Header>
        <Header>Guild details</Header>
        {this.state.isLeader === true ?
          <Item>
            <Item.Header inverted>Guild leader :  {this.state.leaderName.name}</Item.Header>
            <Header inverted as={'h3'}> List of members :</Header>
            {this.state.charName.map(x => (
              <Item key={x._id} >
                <Item.Content>
                  <Item.Header>{x.name}</Item.Header>
                </Item.Content>
              </Item>
            ))}
            <Button color='green' floated='right' as={NavLink} to='/creatures'>Fight!</Button>

            <Header inverted as={'h3'}>Find new players</Header>
            <Grid padded>
              <Input
                placeholder='Email...'
                onChange={this.onSearchChange}
              />
              <Button
                animated
                standard
                onClick={this.onSearchButtonClick}>
                <Button.Content visible>
                  Search
              </Button.Content>
                <Button.Content hidden>
                  <Icon name='search' />
                </Button.Content>
              </Button>

              <Container>
                {this.state.results.map(x => (
                  <Item key={x._id} >
                    <Item.Content>
                      <Grid padded>
                        <Button compact
                          size='mini'
                          color='green'
                          onClick={async () => { await this.ButtonClick(x) }}>
                          <Button.Content visible>
                            <Icon name='plus' />
                          </Button.Content>
                        </Button>
                        <Item.Header>{x.email}  |  {x.name}  |  {x.charName}</Item.Header>
                      </Grid>
                    </Item.Content>
                  </Item>
                ))}
              </Container>
            </Grid>
          </Item>
          : (
            <Item>
              <Item.Header inverted>You are not the leader</Item.Header>
              <Item.Header inverted>Guild leader : {this.state.leaderName.name}</Item.Header>
              <Header inverted as={'h3'}> List of members :</Header>
              {this.state.charName.map(x => (
                <Item key={x._id} >
                  <Item.Content>
                    <Item.Header>{x.name}</Item.Header>
                  </Item.Content>
                </Item>
              ))}
            </Item>
          )
        }

        <TopPortal
          ref={this.portalRef}
          header={'Success!'}
          description={`Adding a player to the guild`}
        />
      </Segment>
    )
  }
}

export default GuildJoin;    