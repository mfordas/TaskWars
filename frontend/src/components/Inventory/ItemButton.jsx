import React from 'react';
import { Item, Button  } from 'semantic-ui-react';

class ItemButton extends React.Component {
  state = { item: this.props.item }

  componentDidMount(){
    this.setState({ item: this.props.item });
  }

  chooseItem = () => {
    this.props.setDescription(this.state.item);
  }

  render(){
    return (
      <Button inverted circular color='grey' onClick={this.chooseItem} >
        <Item.Image src={ this.props.item.picture } size="mini" wrapped />
      </Button>
    );
  }
}

export default ItemButton;