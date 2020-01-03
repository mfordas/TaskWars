import React from 'react';
import _ from 'lodash';
import { Button, Header, Icon, Item, Label, Segment, Image } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios'
import Store from '../../Store';
import { Redirect, NavLink } from 'react-router-dom';

class GuildJoin extends React.Component {


  state = {
    guild_id: '',
    name: '',
    leader: '',
    current_fight: {},
    isLeader: false,
    membersId: [],
    membersName: [],
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

    this.state.membersId.map(async (elem) => {
      const res = await fetch(`/api/users/character/${elem}`, setHeaders())
        .then(response => response.json());
      this.state.membersName.push(res.name);
    })
    console.log(this.state.membersName)
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

  render() {
    return (
      <Segment inverted>
        <Image></Image>
        <Header>Guild details</Header>
        {this.state.name}
        {this.state.isLeader === true ?
          <Item>
            <Header inverted>You are the leader</Header>
            <Button color='green' floated='right' as={NavLink} to='/creatures'>Fight!</Button>
          </Item>
          : <Header inverted>You are not the leader</Header>}
      </Segment>
    )
  }
}

export default GuildJoin;    