import React from 'react';
import setHeaders from '../../utils/setHeaders';
import axios from 'axios';
import { Segment, Button, Image, Table } from 'semantic-ui-react';

class ItemDescription extends React.Component {
  state = { item: null }

  componentDidMount() {
    if (this.props.item)
      this.setState({ item: this.props.item });
  }

  equipped = () => {
    if (this.state.item.slot === 'Usable') {
      console.log('Use item and remove from inventory');
      this.useItem();
    } else {
      this.props.equippedThisItem(this.state.item);
    }
  }
  // equipped = () => {
  //   if(this.props.eq === true) {
  //     if(this.state.item.slot === 'Usable') {
  //     } else {
  //       this.props.equippedThisItem(this.state.item);
  //     }
  //   } else { 
  //     this.props.unequippedThisItem(this.state.item);
  //     console.log('Unequipped item: getback to backpack');
  //   }
  // }

  useItem = async () => {
    const item = await fetch(`/api/item/${this.props.item._id}`)
      .then(response => response.json());
    if (!item) return;

    const charID = await fetch(`/api/users/me`, setHeaders())
      .then(response => response.json())
      .then(user => user.character_id);

    const character = await fetch(`/api/characters/${charID}`)
      .then(response => response.json());
    console.log(character);

    await fetch(`/api/inventory/${character.inventory_id}/backpack/${this.props.item._id}`, {
      method: 'PUT',
      headers: { 'x-auth-token': `${localStorage.getItem('x-auth-token')}` }
    });

    if (item.effect.includes('magic_power')) {
      await axios.put(`/api/characters/${charID}/magical_power`, { magical_power: `${character.magical_power + item.effect_value}` });
    }

    if (item.effect.includes('physical_power')) {
      await axios.put(`/api/characters/${charID}/physical_power`, { physical_power: `${character.physical_power + item.effect_value}` });
    }

    if (item.effect.includes('health') || item.effect.includes('hp')) {
      await axios.put(`/api/characters/${charID}/health`, { health: `${character.health + item.effect_value}` });
    }

  }

  render() {
    return (
      <Segment padded inverted color='black'>

        <h2>
          {this.state.item !== null ? 
            <div> 
              <Image src={this.state.item.picture} avatar />
              {this.state.item.name}
            </div>:
            ' '
          }
        </h2>
        <p>{this.state.item !== null ? this.state.item.description :' '}</p>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}><i>{this.state.item !== null ? 'Effect' : ' '}</i></Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.effect : ' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Value' : ' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.effect_value : ' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Slot' : ' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.slot : ' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Price' : ' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.price : ' '}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <br></br><br></br>
        {/* <Label size='tiny' horizontal attached='bottom' size='tiny' color='grey'>
            {this.props.eq === true ?
                          <Button size="small" onClick={this.check} color='purple'>
                          { this.props.item.slot != null && this.props.item.slot === 'Usable' 
                          ? 'Use' : 
                          'Equipped'}
                        </Button> :
                        <Button size="small" onClick={this.check} color='purple'>
                        { this.props.item.slot != null && this.props.item.slot === 'Usable' 
                          ? 'None' : 
                          'Unequipped'}
                        </Button>
            }
        </Label> */}
      </Segment>
    );
  }
}

export default ItemDescription;