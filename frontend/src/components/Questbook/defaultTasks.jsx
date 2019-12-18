import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Button, Icon, Item, Label } from 'semantic-ui-react';
import Store from '../../Store';

class TasksTable extends React.Component {
  static contextType = Store;

  state = {
    tasks: [],
    questbookId: ''
  }

  

  getData() {
    
    if (!(_.isEqual(this.props.tasks, this.state.tasks))) {
      axios({
        url: `/api/questbook/5dfa2555ea37012b345fc36e/tasks`,
        method: 'get',
        headers: {'x-auth-token': localStorage.getItem('token'),},
      }).then(  result => {
          console.log(result.data);
        var myTasks = result.data;
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
    
  }
    

  render() {
    return (
        <Item.Group divided>
        {this.state.tasks.map(x => (

    <Item key={x._id}>
    <Item.Image src='https://icons-for-free.com/iconfiles/png/128/description+note+problem+task+tasks+icon-1320168114384620466.png'  />

    <Item.Content>
      <Item.Header as='a'>{x.name}</Item.Header>
      <Item.Meta>
        <span className='type'>{x.type}</span>
      </Item.Meta>
      <Item.Description>{x.description}</Item.Description>
      <Item.Description>Duration: {x.duration}</Item.Description>
      <Item.Description>Penalty: {x.penalty}</Item.Description>
      <Item.Extra>
        <Button primary floated='right'>
          Start task
          <Icon name='right chevron' />
        </Button>
        <Label>{x.category}</Label>
        <Label>Gold: {x.reward.gold}</Label>
        <Label>Exp: {x.reward.exp}</Label>
      </Item.Extra>
    </Item.Content>
  </Item>
          ))}
         </Item.Group>   
    );
  }
}

export default TasksTable;    
