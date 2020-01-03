import React from 'react';
import { Segment, Grid, Item, Label, Button, Portal  } from 'semantic-ui-react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import ItemButton from './ItemButton';
import ItemDescription from './ItemDescription';
import ItemView from './ItemView';
class InventoryView extends React.Component {
  state = { 
    id_user: null,
    id_inventory: null,
    backpack: [],
    gold: null,
    items: [],
    backpackItem: [],
    itemDescription: null,
    equippedItems: [],
    equipped: []
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
    console.log(body);
    this.setState({ backpack: body.backpack, gold: body.gold, equippedItems: body.equippedItems });
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
    let equipped = [];
    this.state.backpack.forEach(itemId => {
      let itemInInven =  this.state.items.find((it) => { if(it._id === itemId) return it;});
      bag.push(itemInInven);
    });
    this.state.equippedItems.forEach(itemId => {
      let itemInInven =  this.state.items.find((it) => { if(it._id === itemId) return it;});
      equipped.push(itemInInven);
    });
    this.setState({ backpackItem: bag, equipped: equipped });
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
          items: this.props.items,
        });
        this.putItemInBackpack();
        console.log('Inventory as component');
      }
    console.log('mounted');
  }

  setDescription = (des,eq) => {
    let description = <ItemDescription  key={des._id} 
                                        item={des} 
                                        closeFun={this.setDescToNull} 
                                        equippedThisItem={this.equippedItem}
                                        unequippedThisItem={this.unequippedItem} 
                                        eq={eq}
                                        />;
    this.setState({ itemDescription: description });
  }
  setDescToNull = () => {
    this.setState({ itemDescription: null });
  }

  equippedItem = (item) => {
    console.log('Equipped item button click', item);
    this.fetchEquipped(item);
    let equipped = this.state.equipped;
    equipped.push(item);
    this.setState({ equipped: equipped });
  }

  unequippedItem = (item) => {
    console.log('Unequipped item button click', item);
    this.fetchBackpack(item);
    let equipped = this.state.equipped;
    let backpack = this.state.backpackItem;
    backpack.push(item);

    const index = equipped.indexOf(item._id);
    const it = equipped.splice(index, 1);
    console.log(it, 'Bez tego obiektu', equipped);
    this.setState({ equipped: equipped, backpackItem: backpack });
    this.fetchRemoveFromEquipped(item);
  }

  fetchRemoveFromEquipped = async (item) => {
    console.log('Remove from equippedItems: endpoint');
    const resp = await axios({
      url: `/api/inventory/${this.state.id_inventory}/equippedItems/${item._id}`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    }).then(res => {
        console.log('Put item equippedItems:',res);
// remoe from state?
      })
    .catch(error => console.error(error));
    console.log(resp);
  }

  fetchRemoveFromBackpack = async (item) => {
    console.log('Remove from backpack: endpoint');
    const resp = await axios({
      url: `/api/inventory/${this.state.id_inventory}/backpack/${item._id}`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    }).then(res => {
        console.log('Put item equippedItems:',res);
// remove from state?
      })
    .catch(error => console.error(error));
    console.log(resp);
  }

  fetchEquipped = async (item) => {
    const resp = await axios({
      url: `/api/inventory/${this.state.id_inventory}/equippedItems`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    }).then(res => {
        console.log('Put item equippedItems:',res);
        // let backpackAfterRemove = this.state.backpack.find((it) => {it._id === item._id});
        // this.setState({ backpack: backpackAfterRemove });
        // this.fetchRemoveFromBackpack(afterPay);
      })
    .catch(error => console.error(error));
    console.log(resp);
  }

  fetchBackpack = async (item) => {
    const resp = await axios({
      url: `/api/inventory/${this.state.id_inventory}/backpack`,
      method: 'put',
      data: {
        item: {
          _id: item._id,
        }
      },
      headers: setHeaders(),
    }).then(res => {
        console.log('Put item backpack:',res);
        // let backpackAfterRemove = this.state.backpack.find((it) => {it._id === item._id});
        // this.setState({ backpack: backpackAfterRemove });
        // this.fetchRemoveFromBackpack(afterPay);
      })
    .catch(error => console.error(error));
    console.log(resp);
  }

  fetchRemoveFromBackpack = () => {

  }

  render(){
    // let itemDescription = null;
    return (
      <Segment inverted>
        <Grid.Row textAlign='left' verticalAlign='top'> 
        {this.props.showGold !== false ? <Segment>Gold: {this.state.gold}</Segment> : null}
        </Grid.Row>
        <Grid.Row textAlign='center' verticalAlign='top'>
          { (this.state.itemDescription !== null) ? 
          <Segment inverted color='grey'>{this.state.itemDescription}</Segment> 
          : null}
        </Grid.Row>

        { this.props.ViewEquipped === false ?  
          <Segment> 
            <ItemView
            backpackItem={this.state.backpackItem} 
            setDescription={this.setDescription} 
            buttonActive={this.props.buttonActive}
            eq={true} />
          </Segment> 
          :
          <Segment>           
            <Label>Equipped</Label>
            <ItemView itemDescription={this.state.itemDescription} 
            setDescription={this.setDescription} backpackItem={this.state.equipped} eq={false} />
            <ItemView
            backpackItem={this.state.backpackItem} 
            setDescription={this.setDescription} 
            buttonActive={this.props.buttonActive}
            eq={true} /> 
          </Segment> 
          }
      </Segment>
    );
  }
}

export default InventoryView;