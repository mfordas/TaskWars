import React from 'react';
import { Item, Label } from 'semantic-ui-react';
import BuyItem from './BuyItems';

class ItemView extends React.Component {
  state = { item: this.props.item }

  componentDidMount(){
    this.setState({ item: this.props.item });
    console.log('Monted item');
    console.log(this.state.item);
  }

  BuyItemFun = () => {
    console.log('Item');
    const i = this.state.item;
    this.props.buyItem(this.state.item);
  }

  render() {
    let activeV = this.props.item.price <= this.props.gold ? true : false;
    let disabledV = this.props.item.price > this.props.gold ? true : false;
    return (
      <Item key={ this.props.item._id} color='grey' >
        <Item.Image src={ this.props.item.picture} size="small" wrapped />
          <Item.Content>
            <Item.Header>{ this.props.item.name}</Item.Header>
            <Item.Meta>{ this.props.item.description}</Item.Meta>
            <Item.Description>
              Effect: { this.props.item.effect} <br/>
              Value: { this.props.item.effect_value} <br/>
              slot: { this.props.item.slot} <br/>
              price: { this.props.item.price} <br/>
            </Item.Description>
            <Item.Extra>
              <Label attached='bottom'>
                <BuyItem  item={this.props.item} 
                          active={activeV}
                          disabled={disabledV}
                          value1={this.props.item.price} 
                          value2={this.props.gold}
                          BuyItemFun={this.BuyItemFun} />
              </Label>
            </Item.Extra>
          </Item.Content>
      </Item>
    );
  }
}

export default ItemView;