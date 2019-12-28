import React from 'react';
import _ from 'lodash';
import {
  Button, Icon
  } from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';



class FinishTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: ''
    } 
  
}
  setStatus = async () => {
    return this.props.time.timeToEnd ? this.setState({status: 'completed'}) : this.setState({status: 'failed'});
  }

  putData = async (task_id, questbook_id) =>{
    await axios({
      url: `/api/questbook/${questbook_id}/task/${task_id}`,
      method: 'put',
      headers: setHeaders(),
      data: {status: this.state.status}
    }).then((response) => {
      console.log(response);
    })
  }

  finishTask = async () => {
    const user = await fetch('/api/users/me', setHeaders());
    const body = await user.json();
    const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
    const character = await response.json();
    await this.putData(this.props.task._id, character.questbook_id);
  }
  

  
  onButtonSubmit = async e => {
    e.preventDefault();
    await this.setStatus();
    await this.finishTask();

  }

  componentDidMount() {
  }
  
  componentDidUpdate() {
    
  }



  render() {
    
    return (
      <div>
        <Button color="blue" floated='right' onClick={this.onButtonSubmit}>
          Finish task
          <Icon name="arrow"/>
        </Button>
      </div>
    );
  }
}

export default FinishTask;






