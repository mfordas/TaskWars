import React from 'react';
import { Segment, Grid, Item } from 'semantic-ui-react';
import ItemButton from './ItemButton';

class ItemView extends React.Component {

  render() {
    return (
      <Segment inverted>
      <Grid doubling container centered columns='equal' padded>

            {this.props.backpackItem.map( (item, id = 0) => (
              <Item key={id}>
                <Grid.Column mobile={4} tablet={2} computer={1} stretched> 
                  <ItemButton item={item} 
                              setDescription={this.props.setDescription} 
                              bnActive={this.props.buttonActive}
                              eq={this.props.eq} 
                              />
                </Grid.Column>
              </Item> 
            ))}
      </Grid>
      </Segment> 
    );
  }
}

export default ItemView;