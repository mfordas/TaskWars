import React from 'react';
import _ from 'lodash';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Header,
  Segment
} from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';

const options = [
  { key: 'd', text: 'Daily', value: 'Daily' },
  { key: 'w', text: 'Weekly', value: 'Weekly' },
  { key: 'm', text: 'Monthly', value: 'Monthly' },
  { key: 'ev', text: 'Events', value: 'Events' },
  { key: 'en', text: 'Encounters', value: 'Encounters' },
]

class AddTask extends React.Component {

  state = {
    name: '',
    description: '',
    type: '',
    category: '',
    duration: '',
    reward: {
      exp: '',
      gold: '',
    },
    penalty: '',
    status: ''
  }

  

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    console.log(body.character_id);
    console.log(1);
    this.fetchCharacter(body.character_id);
    
  }


  fetchCharacter = async (id) => {
    const response = await fetch(`/api/characters/${id}`, setHeaders());
    const body = await response.json();
    console.log(body);
    this.postData(body.questbook_id, this.state);
    
    
    }


//     getData = async (id) => {
//       const response = await fetch(`/api/questbook/${id}/task`, setHeaders());
//       const body = await response.json();
//       console.log(body);
//       this.setState(
//         {
//           tasks: body
//         }
//       )
//       }

postData = async (state) => {

const data = state;

try {
  const response = await fetch(`/api/tasks/`, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: setHeaders()
  });
  const json = await response.json();
  console.log('Success:', JSON.stringify(json));
} catch (error) {
  console.error('Error:', error);
}
}


// // const form = new FormData(document.getElementById('login-form'));


//   componentDidMount() {
//     console.log('mounted')
//   }
  
//   componentDidUpdate() {
    
//   }

  onButtonSubmit = () => {
    console.log(this.state)
    this.postData(this.state)


  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
    

  render() {
      const {name,
      description,
      type,
      category,
      duration,
      
        exp,
        gold,
      penalty,
      status
    } = this.state
      return (
        <div>
        <Segment inverted>
        <Form inverted onSubmit={this.onButtonSubmit}>
          <Header inverted>Add new task</Header>
          <Form.Group widths='equal'>
            <Form.Input
              label='Task name'
              placeholder='Task name'
              name = 'name'
              value={name}
              onChange = {this.handleChange}
            />
            
            <Form.Field
              control={Select}
              label='Category'
              options={options}
              placeholder='Category'
              value={category}
              name = 'category'
              onChange = {this.handleChange}
            />
          </Form.Group>
          
          <Form.Field
            control={TextArea}
            label='Description'
            placeholder='Write description of the task...'
            value={description}
            name = 'description'
              onChange = {this.handleChange}
          />
          <Form.Group inline>
            <label>Type</label>
            <Form.Field
              control={Radio}
              label='Physical'
              value='Physical'
              name='type'
              checked={type === 'Physical'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='Mental'
              value='Mental'
              name='type'
              checked={type === 'Mental'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='Utility'
              value='Utility'
              name='type'
              checked={type === 'Utility'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Duration'
              placeholder='Duration'
              value={duration}
              name='duration'
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Penalty'
              placeholder='Penalty'
              value={penalty}
              name='penalty'
              onChange={this.handleChange}
            />
            </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Gold'
              placeholder='Gold'
              value={gold}
              name='gold'
              onChange={this.handleChange}
            />
            <Form.Field
              control={Input}
              label='Exp'
              placeholder='Exp'
              value={exp}
              name='exp'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Field control={Button} >Submit</Form.Field>
        </Form>
        </Segment>
        </div>
    );
  }
}

export default AddTask;    






