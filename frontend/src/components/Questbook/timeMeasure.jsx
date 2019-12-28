import React from 'react';
import _ from 'lodash';
import {
  Button, Icon
  } from 'semantic-ui-react';
  import FinishTask from './finishTask';

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
    this.setState({now: currentDate, startDate: this.props.task.startDate, taskDuration: this.props.task.duration});
  }

 
  
   showDaysHoursMinutesTillEnd(t){
    var cd = 24 * 60 * 60 * 1000,
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
    console.log(this.state.now);
    console.log(this.state.startDate);
    const timeFromBegining = (Date.parse(this.state.now) - Date.parse(this.state.startDate));
    const tillEnd = this.state.taskDuration*3600000 - timeFromBegining;
    this.setState({timeToEnd: tillEnd});
    this.showDaysHoursMinutesTillEnd(this.state.timeToEnd);
}
  
  onButtonSubmit = async e => {
    await this.measureTime();
  }

  
  componentDidMount() {
      this.measureTime();
  }
  
  componentDidUpdate() {
  }

  render() {
    
    return (
      <div>
        <Button color='red' floated='right' onChange={this.onButtonSubmit}>
          Time to end: {this.state.days} Days {this.state.hours} Hours {this.state.minutes} Minutes 
          <Icon name='bell'/>
        </Button>
        <FinishTask time={this.state} task={this.props.task}/>
      </div>
    );
  }
}

export default MeasureTime;






