import React from 'react';
import { Segment, Grid, Item, Portal, Button, Confirm } from 'semantic-ui-react';
import ItemButton from './ItemButton';
import ItemDescription from './ItemDescription';
import ItemEquipped from './ItemEquipped';

class ItemView extends React.Component {
  state = { itemDescription: null,  open: false, item: null, }

  handleConfirm = () => { 
    this.setState({ open: false });
    if(this.props.eq === true) {
      if(this.state.item.slot === 'Usable') {
        this.props.useItem(this.state.item,1);
      } else {
        this.props.equippedItem(this.state.item);
        this.props.useItem(this.state.item,1);
      }
    } else { 
      this.props.unequippedItem(this.state.item);
      this.props.useItem(this.state.item,-1);
      console.log('Unequipped item: getback to backpack');
    } 
  }

  handleCancel = () => { 
    this.setState({ open: false }); 
  }

  setDescription = (des) => {
    let description = <ItemDescription  key={des._id} 
                                        item={des} 
                                        equippedThisItem={this.props.equippedItem}
                                        unequippedThisItem={this.props.unequippedItem} 
                                        eq={this.props.eq}
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
                {/* <Portal onClose={this.handleClose} open={this.state.open}>
                  <Segment style= {{ left: '40%', position: 'fixed', top: '20%', zIndex: 1000, }}>
                  {this.state.itemDescription}
                    
                  </Segment>
                  </Portal> */}
                              
                  <Confirm
                    content={this.state.itemDescription}
                    open={this.state.open}
                    cancelButton='Close'
                    confirmButton={this.props.eq === true ? 
                      item.slot != null && item.slot === 'Usable' ? 'Use' : 'Equipped':
                      item.slot != null && item.slot === 'Usable' ? 'None' : 'Unequipped'}
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
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