import React from 'react';
import _ from 'lodash';
import {
  Button, Icon, Segment, Grid
  } from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';



class PauseTask extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      startDate:'',
      status: '',
      paused: false,
    pauseDate: '',
    pauseTime: '',
    pauseHours: '',
    pauseMinutes: '',
    } 
  
}


  //pause

  

  pauseTask = async () => {
    
    console.log('Now ' + this.props.time.now);
    console.log('Start date ' + this.props.task.pauseDate);
    console.log('Pause time ' + this.state.pauseTime);

    console.log('Time to end ' + this.props.time.timeToEnd);
    console.log('Pause time ' + Date.parse(this.state.pauseTime));
    console.log('Status ' + this.props.task.status)
    
    // console.log(newTimeToEnd);
    
  }

  measurePause = async () => {
    let newTimeToEnd = this.props.time.timeToEnd + Date.parse(this.state.pauseTime);
    await this.props.setTimeToEnd(newTimeToEnd);
    const timeTillEndOfPause = (Date.parse(this.props.time.now) - Date.parse(this.props.task.pauseDate));
    console.log('Time till end of pause' + timeTillEndOfPause);
    const tillPauseEnd = (Date.parse(this.state.pauseTime)) - timeTillEndOfPause;
    this.setState({pauseTime: tillPauseEnd});
    this.showHoursMinutesTillPauseEnd(this.state.pauseTime);
    console.log(this.props.task.pauseDate);
}

showHoursMinutesTillPauseEnd(t){
  let cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor( (t - d * cd) / ch),
      m = Math.round( (t - d * cd - h * ch) / 1000),
      pad = function(n){ return n < 10 ? '0' + n : n; };
if( m === 60 ){
  h++;
  m = 0;
}
if( h === 24 ){
  d++;
  h = 0;
}
console.log('h' + h);
console.log('m' + m);
this.setState({pauseHours: h, pauseMinutes: m})
}

setStatus = async () => {
  return this.state.paused === true ? this.setState({status: 'paused'}) : this.setState({status: 'uncompleted'});
}

putData = async (task_id, questbook_id) =>{
  await axios({
    url: `/api/questbook/${questbook_id}/task/${task_id}/pause`,
    method: 'put',
    headers: setHeaders(),
    data: {status: 'paused', pauseDate: new Date}
  }).then((response) => {
    this.setState({paused: true, pauseTime: new Date(86400000)})
    this.setStatus();
    console.log(response);
  })
}

startPause = async () => {
  const user = await fetch('/api/users/me', setHeaders());
  const body = await user.json();
  const response = await fetch(`/api/characters/${body.character_id}`, setHeaders());
  const character = await response.json();
  await this.putData(this.props.task._id, character.questbook_id);
}

  
  onButtonSubmit = async e => {
    e.preventDefault();
    await this.startPause();
    await this.measurePause();
    
    
  }
  
  onChange = async e => {
    await this.measurePause();
    await this.props.taskStateChanged(this.state.status);
  }

  componentDidMount() {
    this.measurePause();
     this.Time = setInterval (() => this.measurePause(), 1000);
  }
  
  componentDidUpdate(prevProps) {
    clearInterval(this.Time);
  }

  render() {
    
    return (
      this.props.task.status === "in_progress" ? 
      <div>
        <Button fluid icon color="blue" onClick={this.onButtonSubmit}>
          Pause task for 24 hours
          <Icon name="check circle"/>
        </Button>
        </div> : 
        <div>
          <Segment inverted textAlign='center' color='grey' onChange={this.onChange}>
          Task paused for 24 hours. Time to end: {this.state.pauseHours} hours {this.state.pauseMinutes} minutes
        </Segment>
        <Button fluid icon color="blue" onClick={this.onButtonSubmit}>
          Pause task for 24 hours
          <Icon name="check circle"/>
        </Button>
        </div>
    );
  }
}

export default PauseTask;






