import React from 'react';
import _ from 'lodash';
import {
  Button, Icon
  } from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';



class StartTask extends React.Component {

  state = {
    status: ''
  }




  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    console.log(body.character_id);
    this.fetchCharacter(body.character_id);

  }


  fetchCharacter = async (id) => {
    const response = await fetch(`/api/characters/${id}`, setHeaders());
    const body = await response.json();
    console.log(body.questbook_id);
    this.postData(body.questbook_id, this.state);


  }

  putData = async (task_id, state) =>{
    let data = state;
    console.log(2);
    console.log(data);
    await axios({
      url: `/api/questbook/5e0619edcb1d7f1df877b390/status`,
      method: 'put',
      headers: setHeaders(),
      data:  this.setState({status: "in_progress"})
    })
  }
  

  
//   onButtonSubmit = async e => {
//     e.preventDefault();
//     console.log(this.state);
//     await this.fetchUser();


//   }
//   handleChange = (e, { name, value }) => this.setState({ [name]: value })

startTask = async (e, { name }) => {
    const userFetch = await fetch('/api/users/me', setHeaders());
    const user = await userFetch.json();
    const characterFetch = await fetch(`/api/characters/${user.character_id}`);
    const character = await characterFetch.json();
    const taskToInsert = {
        // "_id": `${this.props.task._id}`,
        "name": `${this.props.task.name}`,
        "description": `${this.props.task.description}`,
        "type": `${this.props.task.type}`,
        "category": `${this.props.task.category}`,
        "duration": `${this.props.task.duration}`,
        "exp": `${this.props.task.exp}`,
        "gold": `${this.props.task.gold}`,
        "penalty": `${this.props.task.penalty}`,
        "status": "in_progress"
    };
    
    await axios.put(`/api/questbook/${character.questbook_id}/task`, taskToInsert);
}



  


  render() {
    
    return (
      <div>
        <Button primary floated='right' onClick={this.startTask}>
          Start task
          <Icon name='right chevron' />
        </Button>
      </div>
    );
  }
}

export default StartTask;






