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

  putData = async (task_id, questbook_id) =>{
    await axios({
      url: `/api/questbook/${questbook_id}/task/${task_id}`,
      method: 'put',
      headers: setHeaders()
    }).then((response) => {
      console.log(response);
      this.setState({status: "in_progress"})
    })
  }

  startTask = async () => {
    const user = await fetch('/api/users/me', setHeaders());
    const body = await user.json();
    const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
    const character = await response.json();
    await this.putData(this.props.task._id, character.questbook_id)
  }
  

  
  onButtonSubmit = async e => {
    e.preventDefault();
    await this.startTask();
    console.log(this.state);

  }

pickColor() {
  if (this.props.task.status === '')
      return { color: 'blue' };
  if (this.props.task.status === 'in_progress')
      return { color: 'yellow' };
}

pickContent() {
  if (this.props.task.status === '')
      return 'Start task';
  if (this.props.task.status === 'in_progress')
      return 'Task in progress!';
}

pickIcon() {
  if (this.props.task.status === '')
      return { name: 'chevron right' };
  if (this.props.task.status === 'in_progress')
      return { name: 'clock' };
}

  render() {
    
    return (
      <div>
        <Button {...this.pickColor()} floated='right' onClick={this.onButtonSubmit}>
          {this.pickContent()}
          <Icon {...this.pickIcon()}/>
        </Button>
      </div>
    );
  }
}

export default StartTask;






