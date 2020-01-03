import React from 'react';
import { Item, Segment, Icon, Button, Step, Header, Image } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import Store from '../../Store';
const _ = require('lodash')


class CreaturePattern extends React.Component {
  state = {
    guild_id: '5e09501790ddee12645725ec',
    description: 'temp desc' //this.props.creature.task_to_dmg.description
    
  };
  static contextType = Store;

  addCreatureToFight = async (creature, guild_id, guild_name, task_id) => {
    // const creatureResponse = await fetch(`/api/creatures/${creature_id}`, setHeaders());
    // const creature = await creatureResponse.json();
    // console.log(creature)

    let task_to_dmg = await this.addTaskToMemebers(task_id, guild_id)
    // console.log(task_to_dmg);
    creature.task_to_dmg = task_to_dmg;

    // console.log(creature)
    const data = {
        name: guild_name,
        current_fight: creature
    }
    const params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};
    const response = await fetch(`/api/guilds/${guild_id}/current_fight`, params);
    const body = await response.json();
}

addTaskToMemebers = async (task_id, guild_id) => {
    const guildResponse = await fetch(`/api/guilds/${guild_id}`, setHeaders());
    const guild = await guildResponse.json();

    const taskResponse = await fetch(`/api/tasks/${task_id}`, setHeaders());
    const task = await taskResponse.json();
    // console.log(task);

    let data = _.omit(task, ['_id', '__v', '__proto']);
    // console.log(data)
    let params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};

    const task_to_dmg = [];
    const requests = guild.members.map(async (member_id) => {
        const memberResponse = await fetch(`/api/characters/${member_id}`, setHeaders());
        const member = await memberResponse.json();
        
        // console.log(params)
        const memberTasksResponse = await fetch(`/api/questbook/${member.questbook_id}/task`, params);
        const memberTasks = await memberTasksResponse.json();
        // console.log(memberTasks);
        return memberTasks.tasks[memberTasks.tasks.length-1]._id;
        // task_to_dmg.push(memberTasks.tasks[memberTasks.tasks.length-1]._id);
    })

    return Promise.all(requests)
        .then(id =>{
            task_to_dmg.push(...id)
        })
        .then(() => {
            return task_to_dmg;
        })
}

  // addCreatureToFight = async () => {
  //   /*const data = {
  //     "name": `${this.props.creature.name}`,
  //     //"level": `${this.props.creature.level}`,
  //    // health: this.props.creature.health,
  //     //physical_power: this.props.creature.physical_power,
  //    // physical_resistance: this.props.creature.physcical_resistance,
  //    // magical_power: this.props.creature.magical_power,
  //     //magical_resistance: this.props.creature.magical_resistance,
  //     //exp: this.props.creature.exp,
  //    // gold: this.props.creature.gold,
  //     //duration: this.props.creature.duration,
  //     //task_to_dmg: [],
  //     //picture: this.props.creature.picture
  //   }
  //   await axios({
  //     url: `api/guilds/${this.state.guild_id}/current_fight`,
  //     method: 'put',
  //     data: data,
  //     headers: setHeaders(),
  //   }).then((response)=>{
  //     console.log(response)
  //   }, (error) => {
  //     console.log(error);
  //   });*/
  // };

  handleFightButtonClick = async (event) => {
    // console.log(this.props.creature);
     const creatureData = {
      name: `${this.props.creature.name}`,
      level: this.props.creature.level,
     health: this.props.creature.health,
      physical_power: this.props.creature.physical_power,
     physical_resistance: this.props.creature.physcical_resistance,
     magical_power: this.props.creature.magical_power,
      magical_resistance: this.props.creature.magical_resistance,
      exp: this.props.creature.exp,
     gold: this.props.creature.gold,
      duration: this.props.creature.duration,
      task_to_dmg: [],
      picture: this.props.creature.picture
    }
    const guild_id = '5e0f7a57331d6216cca19c90';        //change
    const guild_name = "Guild_0";                       //change
    const task_id = "5e0f7a57331d6216cca19c5f";         //change
    await this.addCreatureToFight(creatureData, guild_id, guild_name, task_id);
  };
  
  render() {
    return (
      <Segment.Group horizontal>
        <Segment style={{ width: '35%' }}>
          <Image src={this.props.creature.picture} />
        </Segment>
        <Segment>
          <Item>
            <Item.Header
              style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }}
              as={'h1'}
            >
              {this.props.creature.name}
            </Item.Header>
            <Item.Header
              style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }}
              as={'h1'}
            >
              level {this.props.creature.level}
            </Item.Header>
            <Item.Description>
              <Segment.Group>
                <Segment inverted textAlign="center" color="purple" style={{ padding: '2px 0px 0px 6px' }}>
                  <Header as="h5">How to fight</Header>
                </Segment>
                <Segment>
                  Complete following quest to deal damage:
                  <br />
                  {this.state.description} 
                </Segment>
              </Segment.Group>
            </Item.Description>

            <Step.Group widths={4} size="tiny">
              <Step style={{ padding: '2px' }}>
                <Icon name="dot circle" color="yellow" />
                <Step.Content>
                  <Step.Title>Gold</Step.Title>
                  <Step.Description>{this.props.creature.gold}</Step.Description>
                </Step.Content>
              </Step>
              <Step style={{ padding: '2px' }}>
                <Icon name="star" color="violet" />
                <Step.Content>
                  <Step.Title>Experience</Step.Title>
                  <Step.Description>{this.props.creature.exp}</Step.Description>
                </Step.Content>
              </Step>
              <Step style={{ padding: '2px' }}>
                <Icon name="clock" color="teal" />
                <Step.Content>
                  <Step.Title>Duration</Step.Title>
                  <Step.Description>{this.props.creature.duration}</Step.Description>
                </Step.Content>
              </Step>
              <Step style={{ padding: '2px' }}>
                <Icon name="heart" color="red" />
                <Step.Content>
                  <Step.Title>Health</Step.Title>
                  <Step.Description>{this.props.creature.health}</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>

            <Step.Group widths={4} size="tiny">
              <Step style={{ padding: '2px' }}>
                <Icon name="hand rock" color="red" />
                <Step.Content>
                  <Step.Title>Physical Power</Step.Title>
                  <Step.Description>{this.props.creature.physical_power}</Step.Description>
                </Step.Content>
              </Step>
              <Step style={{ padding: '2px' }}>
                <Icon name="shield alternate" color="red" />
                <Step.Content>
                  <Step.Title>Physical Resist</Step.Title>
                  <Step.Description>{this.props.creature.physcical_resistance}</Step.Description>
                </Step.Content>
              </Step>
              <Step style={{ padding: '2px' }}>
                <Icon name="bolt" color="blue" />
                <Step.Content>
                  <Step.Title>Magical Power</Step.Title>
                  <Step.Description>{this.props.creature.magical_power}</Step.Description>
                </Step.Content>
              </Step>
              <Step style={{ padding: '2px' }}>
                <Icon name="shield alternate" color="blue" />
                <Step.Content>
                  <Step.Title>Magical Resist</Step.Title>
                  <Step.Description>{this.props.creature.magical_resistance}</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
            <Item.Extra>
              <Button fluid icon color="red" labelPosition="right" onClick={this.handleFightButtonClick}>
                <Icon name="gavel" />
                Fight
              </Button>
            </Item.Extra>
          </Item>
        </Segment>
      </Segment.Group>
    );
  }
}

export default CreaturePattern;
