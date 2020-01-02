import React from 'react';
import _ from 'lodash';
import { Button, Header, Icon, Item, Label, Segment, Image } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios'
import Store from '../../Store';

class GuildJoin extends React.Component {
 

  state = {
    guild_id: '', 
    name:'',
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
      this.setState({name: response.data.name})
    }, (error) => {
      console.log(error);
    });
  }


  componentDidMount= async () =>{
    await this.setState({guild_id: this.context.guild_id});
    this.getGuild();
  }

  render() {
    return (
      <Segment>
      <Image></Image>
      <Header>Guild details</Header> 
      {this.state.name}
      </Segment>
      
    )
  }
}

export default GuildJoin;    