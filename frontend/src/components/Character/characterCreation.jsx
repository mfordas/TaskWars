import React from 'react';
import {
  Button,
  Form,
  Radio,
  Header,
  Segment,
  Label,
  Image,
  Message
} from 'semantic-ui-react'
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

const classChosen = {
  '': {
    avatar: '',
    text: "Choose a class for more information.",
    stats: ''
  },
  'Warrior': {
    avatar: 'https://images-na.ssl-images-amazon.com/images/I/718T-mBL9AL._SY500_.jpg',
    text: 'Mighty swordmaster',
    stats: '+5 additional maximum health and physical power per level'
  },
  'Hunter': {
    avatar: 'https://i.pinimg.com/originals/9e/d3/b1/9ed3b13275b8ccc7908be73753b33842.jpg',
    text: 'Sneaky sniper',
    stats: '+10 additional physical power per level'
  },
  'Mage': {
    avatar: 'https://previews.123rf.com/images/chudtsankov/chudtsankov1303/chudtsankov130300165/18573211-happy-wizard-with-open-arms.jpg',
    text: 'Kills in 5 seconds dies in 2...',
    stats: '+10 additional magical power per level'
  },
  'Druid':{
    avatar: 'http://midnightsun2.wdfiles.com/local--resized-images/druids/druid%203%20%282%29.jpg/medium.jpg',
    text: 'Protector of nature',
    stats: '+5 additional maximum health and magical power per level'
  }
};

class CharacterCreation extends React.Component {
  state = {
    name: '',
    charClass: 'Warrior',
    inventory_id: '',
    questbook_id: '',
    expRequired: 100,
    health: '',
    physical_power: '',
    magical_power: '',
    nameTaken: false
  }

  postQuestbook = async () =>{
    await axios({
      url: 'api/questbook',
      method: 'post',
      headers: setHeaders(),
    }).then((response)=>{
      this.setState({questbook_id: response.data._id})
    }, (error) => {
      console.log(error);
    });
  }


  postInventory = async () =>{
    await axios({
      url: 'api/inventory',
      method: 'post',
      headers: setHeaders(),
    }).then((response)=>{
      this.setState({inventory_id: response.data._id})
    }, (error) => {
      console.log(error);
    });
  }

  setStatistics = async () => {
    if(this.state.charClass === 'Warrior' ){
      this.setState({
        health: 35,
        physical_power: 6,
        magical_power: 1})
    }else if(this.state.charClass === 'Hunter' ){
      this.setState({
        health: 31,
        physical_power: 11,
        magical_power: 1})
    }else if(this.state.charClass === 'Mage' ){
      this.setState({
        health: 31,
        physical_power: 1,
        magical_power: 11})
    }else if(this.state.charClass === 'Druid' ){
      this.setState({
        health: 31,
        physical_power: 1,
        magical_power: 6})
    }
  }

  postCharacter = async () =>{
    await this.postQuestbook();
    await this.postInventory();
    await this.setStatistics();
    console.log(this.state);
    await axios({
      url: 'api/characters',
      method: 'post',
      data: {
        name: this.state.name,
        charClass: this.state.charClass,
        inventory_id: this.state.inventory_id,
        questbook_id: this.state.questbook_id,
        expRequired: this.state.expRequired,
        maxHealth: this.state.health,
        health: this.state.health,
        physical_power: this.state.physical_power,
        magical_power: this.state.magical_power
      },
      headers: setHeaders(),
    })
  }

  checkName = async () => {
    await axios({
      url: 'api/characters',
      method: 'get',
      headers: setHeaders()
    }).then((response) => {
      response.data.forEach((data) => {
        if(data.name === this.state.name){
          this.setState({nameTaken: true})
        }
      })
    }, (error) => {
      console.log(error);
    });
  }

  handleButtonClick = async (event) => {
    this.setState({nameTaken: false})
    event.preventDefault();
    await this.checkName();
    if(this.state.nameTaken === false && this.state.name.length > 5) {
      this.postCharacter();
    }
  }

  handleInputChange = (e, {name, value}) => this.setState({ name: value});
  handleRadioChange = (e, {charClass, value }) => this.setState({ charClass: value });

  render() {
    const {name, charClass} = this.state;
    const {text, avatar, stats} = classChosen[charClass];
    return(
      <div> 
      <Segment>
        <Form onSubmit={this.handleButtonClick}>
          <Header>Character name</Header>
          <Form.Group inline >
            <Form.Input
            required
            placeholder='Character Name'
            name = 'name'
            value = {this.name}
            onChange = {this.handleInputChange}
            />
            {this.state.name.length < 5 ?
            <Label>Name must be at least 5 characters long.</Label> : null}
          </Form.Group>

          {this.state.nameTaken === true ?
          <Message color = 'red' header ='Name taken' content = 'This name is already in use.'/> : null}

          <Header>Class</Header>
          <Form.Group inline>
            <Form.Field>
              <Radio label = 'Warrior' name = "charClassRadio" value = 'Warrior'  checked={charClass === 'Warrior'} onChange ={this.handleRadioChange} default />
            </Form.Field>
            <Form.Field>
              <Radio label = 'Hunter' name = "charClassRadio" value = 'Hunter'  checked={charClass === 'Hunter'} onChange ={this.handleRadioChange} />
            </Form.Field>
            <Form.Field>
              <Radio label = 'Mage' name = "charClassRadio" value = 'Mage'  checked={charClass === 'Mage'} onChange ={this.handleRadioChange} />
            </Form.Field>
            <Form.Field>
              <Radio label = 'Druid' name = "charClassRadio" value = 'Druid' checked={charClass === 'Druid'} onChange ={this.handleRadioChange} />
            </Form.Field>
          </Form.Group>
          <Button type = 'submit'>Create</Button>
        </Form>
      </Segment>
      <Segment.Group horizontal>
        <Segment floated = 'left' >
          <Image size = 'medium' src = {avatar} />
        </Segment>
        <Segment floated = 'right' >
          <Header as='h1'>{charClass} {name}</Header>
          <Header>{text}</Header>
          <Header>{stats}</Header>
        </Segment>
      </Segment.Group>
    </div>
    );
  }
}

export default CharacterCreation;    