import React from 'react';
import { Segment, Grid, Item, Label, Button  } from 'semantic-ui-react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import ItemButton from './ItemButton';
import ItemDescription from './ItemDescription';

class InventoryView extends React.Component {
  state = { 
    id_user: null,
    id_inventory: null,
    backpack: [],
    gold: null,
    items: [],
    backpackItem: [],
    itemDescription: null
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.setState({ id_user: body.character_id });
    this.fetchInventory(this.state.id_user);
  }

  fetchInventory = async (character_id) => {
    const response = await fetch('/api/characters/'+character_id, setHeaders());
    const body = await response.json();
    this.setState({ id_inventory: body.inventory_id });
    this.fetchGetInventory(this.state.id_inventory);
  }

  fetchGetInventory = async (id_inventory) => {
    const response = await fetch('/api/inventory/'+id_inventory, setHeaders());
    const body = await response.json();
    this.setState({ backpack: body.backpack, gold: body.gold });
    console.log(this.state);
    this.putItemInBackpack();
  }

  fetchItems = async () => {
    const response = await fetch('/api/item', setHeaders());
    const body = await response.json();
    this.setState({ items: body });
    this.putItemInBackpack();
  }

  putItemInBackpack(){
    let bag = [];
    this.state.backpack.forEach(itemId => {
      let itemInInven =  this.state.items.find((it) => { if(it._id === itemId) return it;});
      bag.push(itemInInven);
    });
    this.setState({ backpackItem: bag });
  }

  componentDidMount() {
    if( !this.props.id_user && !this.props.id_inventory && !this.props.backpack &&
      !this.props.gold && !this.props.items ) {
        this.fetchUser();
        this.fetchItems();
      }else {
        this.setState({
          id_user: this.props.id_user,
          id_inventory: this.props.id_inventory,
          backpack: this.props.backpack,
          gold: this.props.gold,
          items: this.props.items
        });
        this.putItemInBackpack();
      }
    console.log('mounted');
  }

  setDescription = (des) => {
    let description = <ItemDescription key={des._id} item={des} closeFun={this.setDescToNull} />;
    this.setState({ itemDescription: description });
  }
  setDescToNull = () => {
    this.setState({ itemDescription: null });
  }

  render(){
    // let itemDescription = null;
    return (
      <Segment inverted>
      <Grid doubling container centered columns='equal' padded>
        <Grid.Row textAlign='left' verticalAlign='top'> 
          <Segment>Gold: {this.state.gold}</Segment>
        </Grid.Row>
        <Grid.Row textAlign='center' verticalAlign='top'>
          { (this.state.itemDescription !== null) ? 
          <Segment>{this.state.itemDescription}</Segment> 
          : null}
        </Grid.Row>
            {this.state.backpackItem.map( (item, id = 0) => (
              <Item key={id}>
                <Grid.Column mobile={4} tablet={2} computer={1} stretched> 
                  <ItemButton item={item} setDescription={this.setDescription} />
                </Grid.Column>
              </Item> 
            ))}
      </Grid>
      </Segment> 
    );
  }
}

export default InventoryView;