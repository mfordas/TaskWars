import React from 'react';
import { Segment } from 'semantic-ui-react';

class ItemDescription extends React.Component {
  state = { item: null }

  componentDidMount() {
    if(this.props.item)
    this.setState({ item: this.props.item });
  }

  render() {
    return (
      <Segment>
        <h2>{this.state.item !== null ? this.state.item.name :' '}</h2>
        <p>{this.state.item !== null ? this.state.item.description :' '}</p>
        <i>{this.state.item !== null ? this.state.item.effect :' '}</i>
        <i>{this.state.item !== null ? ' value: '+this.state.item.effect_value :' '}</i><br></br>
        <i>{this.state.item !== null ? this.state.item.slot :' '}</i><br></br>
        <i>{this.state.item !== null ? 'Price: '+this.state.item.price :' '}</i>
      </Segment>
    );
  }
}

export default ItemDescription;