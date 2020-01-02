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
    name:'',
    leader: '',
    current_fight:{},
    isLeader: false

  }

  static contextType = Store;

  getGuild = async () => {
    await axios({
      url: `api/guilds/${this.state.guild_id}`,
      method: 'get',
      headers: setHeaders()
    }).then((response) => {
      console.log(response);
      this.setState({name: response.data.name, leader: response.data.leader})
    }, (error) => {
      console.log(error);
    });
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    console.log(body.character_id);
    this.checkLeadership(body.character_id);
  }

  checkLeadership = async (character_id) =>{
    if(character_id === this.state.leader) {
      this.setState({isLeader: true});
    }
  }


  componentDidMount= async () =>{
    await this.setState({guild_id: this.context.guild_id});
    await this.getGuild();  
    await this.fetchUser();
  }

  render() {
    return (
      <Segment>
      <Image></Image>
      <Header>Guild details</Header> 
      {this.state.name}
      {this.state.isLeader === true ?
      <Item>
        <Header>You are not the leader</Header>
        <Button color='green' floated='right' as={NavLink} to ='/creatures'>Fight!</Button>
      </Item>
      : <Header>You are not the leader</Header>}
      </Segment>
    )
  }
}

export default GuildJoin;    