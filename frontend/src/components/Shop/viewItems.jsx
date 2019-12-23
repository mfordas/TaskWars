import React from 'react';
import { Segment, Icon, Item  } from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';

class ViewItems extends React.Component {
  state = { items: [] }

  fetchItems = async () => {
    const response = await fetch('/api/item', setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ items: body });
  }
  componentDidMount() {
    this.fetchItems();
    console.log('mounted');
  }
  render() {
    return (
        <Item.Group divided>
        {this.state.items.map(item => (

    <Item key={item._id} >
    <Item.Content>
      <Item.Header as='a'>{item.name}</Item.Header>
      {/* <Item.Meta>
        <span className='type'>{item.type}</span>
      </Item.Meta> */}
      {/* <Item.Description>{x.description}</Item.Description>
      <Item.Description>Duration: {x.duration}</Item.Description>
      <Item.Description>Penalty: {x.penalty}</Item.Description>
      <Item.Extra>
        <Button primary floated='right'>
          Start task
          <Icon name='right chevron' />
        </Button>
        <Label color = 'brown'>{x.category}</Label>
        <Label color = 'yellow'>Gold: {x.reward.gold}</Label>
        <Label color = 'teal'>Exp: {x.reward.exp}</Label>
      </Item.Extra> */}
    </Item.Content>
  </Item>
          ))}
         </Item.Group>   
    );
  }
}

export default ViewItems;