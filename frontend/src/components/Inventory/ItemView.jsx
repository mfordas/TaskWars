import React from 'react';
import { Segment, Grid, Item, Portal, Button } from 'semantic-ui-react';
import ItemButton from './ItemButton';
import ItemDescription from './ItemDescription';

class ItemView extends React.Component {
  state = { itemDescription: null,  open: false, item: null }

  setDescription = (des,eq) => {
    let description = <ItemDescription  key={des._id} 
                                        item={des} 
                                        equippedThisItem={this.props.equippedItem}
                                        unequippedThisItem={this.props.unequippedItem} 
                                        eq={eq}
                                        />;
    this.setState({ itemDescription: description, item: des });
  }

  handleClose = () => this.setState({ open: false })
  handleOpen = () => this.setState({ open: true })

  render() {
    return (
      <Segment inverted>
      <Grid doubling container centered columns='equal' padded>
        {this.props.backpackItem.map( (item, id = 0) => (
          <Item key={id}>
            <Grid.Column mobile={4} tablet={2} computer={1} stretched>
                <ItemButton item={item} 
                            setDescription={this.setDescription} 
                            bnActive={this.props.buttonActive}
                            eq={this.props.eq} 
                            handleOpen={this.handleOpen}
                            />
                <Portal onClose={this.handleClose} open={this.state.open}>
                  <Segment style= {{ left: '40%', position: 'fixed', top: '20%', zIndex: 1000, }}>
                  {this.state.itemDescription}
                  </Segment>
                </Portal>
            </Grid.Column>
          </Item> 
        ))}
      </Grid>
      </Segment> 
    );
  }
}

export default ItemView;