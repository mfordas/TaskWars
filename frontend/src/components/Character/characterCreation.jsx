import React from 'react';
import {
  Button,
  Form,
  Radio,
  Header,
  Segment,
  Label,
  Image
} from 'semantic-ui-react'
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';

const classChosen = {
  '': {
    avatar: '',
    text: "Choose a class for more information."
  },
  'Warrior': {
    avatar: 'https://images-na.ssl-images-amazon.com/images/I/718T-mBL9AL._SY500_.jpg',
    text: 'Mighty swordmaster',
  },
  'Hunter': {
    avatar: 'https://i.pinimg.com/originals/9e/d3/b1/9ed3b13275b8ccc7908be73753b33842.jpg',
    text: 'Sneaky sniper',
  },
  'Mage': {
    avatar: 'https://previews.123rf.com/images/chudtsankov/chudtsankov1303/chudtsankov130300165/18573211-happy-wizard-with-open-arms.jpg',
    text: 'Kills in 5 seconds dies in 2...'
  },
  'Druid':{
    avatar: 'http://midnightsun2.wdfiles.com/local--resized-images/druids/druid%203%20%282%29.jpg/medium.jpg',
    text: 'Protector of nature'
  }
};

class CharacterCreation extends React.Component {
  state = {
    name: '',
    charClass: '',
    inventory_id: '5dfbfa9c9f0dfe3ef4e511f5',
    questbook_id: '5dfbfa9c9f0dfe3ef4e512f5'
  }

  // postCharacter = async (state) => {
  //   const data = state;
  //   console.log(data)
  //   try {
  //     const response = await fetch('http://localhost:8080/api/characters', {
  //       method: 'POST',
  //       body: {
  //         "name": "Habarala",
  //         "charClass": "Druid",
  //         "inventory_id": "5dfbfa9c9f0dfe3ef4e511f5",
  //         "questbook_id": "5dfbfa9c9f0dfe3ef4e512f5"
  //       },
  //       headers: setHeaders(),
  //       mode: 'no-cors'
  //     });
  //     const json = await response.json();
  //     console.log('Success:', JSON.stringify(json));
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }
  //JSON.stringify(data)

  postCharacter = async () =>{
    await axios({
      url: 'api/characters',
      method: 'post',
      data: {
        name: this.state.name,
        charClass: this.state.charClass,
        inventory_id: this.state.inventory_id,
        questbook_id: this.state.questbook_id
      },
      headers: setHeaders(),
    })
  }




  handleButtonClick = () => {
    this.postCharacter()
  }

  handleInputChange = (e, {name, value}) => this.setState({name: value});
  handleRadioChange = (e, {charClass, value }) => this.setState({ charClass: value });

  render() {
    const {name, charClass} = this.state;
    const {text, avatar} = classChosen[charClass];
    return(
      <div> 
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Header >Create your character!</Header>
          <Form.Group>
            <Form.Input label='Character Name'
            placeholder='Character Name'
            name = 'name'
            value = {this.name}
            onChange = {this.handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Header>Class: </Header>
            <Radio label = 'Warrior' name = "charClassRadio" value = 'Warrior'  checked={charClass === 'Warrior'} onChange ={this.handleRadioChange} />
            <Radio label = 'Hunter' name = "charClassRadio" value = 'Hunter'  checked={charClass === 'Hunter'} onChange ={this.handleRadioChange} />
            <Radio label = 'Mage' name = "charClassRadio" value = 'Mage'  checked={charClass === 'Mage'} onChange ={this.handleRadioChange} />
            <Radio label = 'Druid' name = "charClassRadio" value = 'Druid' checked={charClass === 'Druid'} onChange ={this.handleRadioChange} />
          </Form.Group>
          <Button onClick ={this.handleButtonClick}>Create</Button>
        </Form>
      </Segment>
      <Segment>
        <Header>{charClass} {name}</Header>
        <Header>{text}</Header>
        <Image src = {avatar} />
      </Segment>
    </div>
    );
  }
}

export default CharacterCreation;    