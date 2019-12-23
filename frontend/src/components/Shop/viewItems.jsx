import React from 'react';
import { Segment, Icon, Item, Button, Image, ItemExtra  } from 'semantic-ui-react'
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
      <Segment.Group vertical>
        <Item.Group>
        {this.state.items.map(item => (

          <Item key={item._id} >
                      <Segment>
            <Item.Image src={item.picture} size="small" wrapped />
            <Item.Content>
              <Item.Header>{item.name}</Item.Header>
              <Item.Meta>{item.description}</Item.Meta>
              <Item.Description>Effect: {item.effect} Value: {item.effect_value} </Item.Description>
              <Item.Description>slot: {item.slot}</Item.Description>
              <Item.Description>price: {item.price}</Item.Description>
              <Item.Extra>
                <Button primary floated='right'>
                    Buy
                    <Icon name='right chevron' />
                </Button>
              </Item.Extra>
            </Item.Content>
            </Segment>
        </Item>

          ))}
          </Item.Group>
         </Segment.Group> 
    );
  }
}

export default ViewItems;