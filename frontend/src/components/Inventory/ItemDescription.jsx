import React from 'react';
import { Segment, Button, Label, Table } from 'semantic-ui-react';

class ItemDescription extends React.Component {
  state = { item: null }

  componentDidMount() {
    if(this.props.item)
    this.setState({ item: this.props.item });
  }

  equipped = () => {
    if(this.props.eq === true) {
      if(this.state.item.slot === 'Usable') {
        console.log('Use item and remove from inventory');
      } else {
        this.props.equippedThisItem(this.state.item);
      }
    } else { 
      this.props.unequippedThisItem(this.state.item);
      console.log('Unequipped item: getback to backpack');
    }

  }

  render() {
    return (
      <div>
        <Label attached='top right' >
            <Button size="tiny" icon='x' onClick={this.props.closeFun}></Button>
        </Label> 
        <h2>{this.state.item !== null ? this.state.item.name :' '}</h2>
        <p>{this.state.item !== null ? this.state.item.description :' '}</p>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell width={2}><i>{this.state.item !== null ? 'Effect' :' '}</i></Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.effect :' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Value' :' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.effect_value :' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Slot' :' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.slot :' '}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>{this.state.item !== null ? 'Price' :' '}</Table.Cell>
              <Table.Cell>{this.state.item !== null ? this.state.item.price :' '}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Segment inverted>
            {this.props.eq === true ?
                          <Button size="small" onClick={this.equipped}>
                          { this.props.item.slot != null && this.props.item.slot === 'Usable' 
                          ? 'Use' : 
                          'Equipped'}
                        </Button> :
                        <Button size="small" onClick={this.equipped}>
                        { this.props.item.slot != null && this.props.item.slot === 'Usable' 
                          ? 'None' : 
                          'Unequipped'}
                        </Button>
            }

        </Segment> 
      </div>
    );
  }
}

export default ItemDescription;