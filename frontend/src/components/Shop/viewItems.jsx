import React from 'react';
import { Segment, Icon, Item, Button, Image, ItemExtra  } from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';

class ViewItems extends React.Component {
  state = { items: [], id_user: 0, id_inventory: 0 , gold: 0 }

  fetchItems = async () => {
    const response = await fetch('/api/item', setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ items: body });
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ id_user: body.character_id });
    this.fetchInventory(this.state.id_user);
  }

  fetchInventory = async (character_id) => {
    const response = await fetch('/api/characters/'+character_id, setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ id_inventory: body.inventory_id });
    this.fetchUserGold(this.state.id_inventory);
  }

  fetchUserGold = async (inventory_id) => {
    const response = await fetch('/api/inventory/'+inventory_id, setHeaders());
    console.log(response);
    const body = await response.json();
    console.log(body);
    this.setState({ gold: body.gold });

  }

  componentDidMount() {
    this.fetchItems();
    this.fetchUser();

    console.log('mounted');
  }
  componentDidUpdate() {


  }
  render() {
    return (
      
      <Segment.Group vertical>
        <Segment>Your gold: { this.state.gold }</Segment>
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