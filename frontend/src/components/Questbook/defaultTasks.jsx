import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Container } from 'semantic-ui-react';
import Store from '../../Store';

class TasksTable extends React.Component {
  static contextType = Store;

  state = {
    tasks: []
    
  }
  getData() {
    if (!(_.isEqual(this.props.tasks, this.state.tasks))) {
      axios({
        url: `/api/questbook/5df93e5d25b6dd221c6648f2/tasks`,
        method: 'get',
        headers: {'x-auth-token': localStorage.getItem('token'),},
      }).then(  result => {
        var myTasks = result.data.map( task => task._id);
        console.log(myTasks);        
        this.setState({ tasks: myTasks });
      }).catch()  
    }
  }

  componentDidMount() {
    this.getData()
    console.log('mounted')
  }
  
  componentDidUpdate() {
    this.getData()
  }
    

  render() {
    return (
      <Container text>
        {this.state.tasks.map(x => (
          <p key={x._id}>{x}</p>
          ))}
            
      </Container>
    );
  }
}

export default TasksTable;    
