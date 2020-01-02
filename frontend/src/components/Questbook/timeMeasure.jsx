import React from 'react';
import _ from 'lodash';
import {
  Button, Icon, Segment
  } from 'semantic-ui-react';
  import FinishTask from './finishTask';
  import PauseTask from './pauseTask';

class MeasureTime extends React.Component {

  state = {
    startDate: '',
    now: '',
    taskDuration: '',
    timeToEnd: '',
    days: '',
    hours: '',
    minutes: ''
  }

  setTime = () => {
    const currentDate = new Date();
    this.setState({now: currentDate, startDate: this.props.task.startFinishDate, taskDuration: this.props.task.duration});
  }

  setTimeToEnd = (timeToEnd) => {
    this.setState({timeToEnd});
  }
  
   showDaysHoursMinutesTillEnd(t){
    let cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  this.setState({days: d, hours: h, minutes: m})
}

measureTime = async () => {
    await this.setTime();
    const timeFromBegining = (Date.parse(this.state.now) - Date.parse(this.state.startDate));
    const tillEnd = this.state.taskDuration*3600000 - timeFromBegining;
    this.setState({timeToEnd: tillEnd});
    // console.log(this.state.timeToEnd);
    this.showDaysHoursMinutesTillEnd(this.state.timeToEnd);
}
  
  onChange = async e => {
    await this.measureTime();
  }

  

  
  componentDidMount() {
    this.measureTime();
     this.Time = setInterval (() => this.measureTime(), 60000);
     
  }

  componentWillUnmount(){
    clearInterval(this.Time);
  }
  
  componentDidUpdate() {
}

  render() {
    
    return (
      <div>
        <Segment inverted textAlign='center' color='red' onChange={this.onChange}>
          {this.state.timeToEnd>= 0 ? 
          `Time to end: ${this.state.days} Days ${this.state.hours} Hours ${this.state.minutes} Minutes` : 
          `Time's up!`}
          <Icon name='bell'/>
        </Segment>
        <PauseTask time={this.state} task={this.props.task} taskStateChanged={this.props.taskStateChanged} setTimeToEnd={this.setTimeToEnd}/>
        <FinishTask time={this.state} task={this.props.task} taskStateChanged={this.props.taskStateChanged}/>
      </div>
         
    );
  }
}

export default MeasureTime;






