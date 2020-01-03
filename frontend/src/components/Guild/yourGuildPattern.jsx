import React from 'react';
import { Item, Grid, Container, Segment, Icon, Button, Label, Popup, Step, Header } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import { Redirect, NavLink } from 'react-router-dom';
const axios = require('axios');

class YourGuildPattern extends React.Component {
  constructor(props) {
    super(props);

    this.portalRef = React.createRef();
    this.state = { open: false }
  }

  handleButtonAddClick = async (e, { name }) => {
    { localStorage.setItem('currentGuild', this.props.guild._id) }
  }

  render() {
    return (
      <Segment textAlign='left'>
        <Item.Group divided>
          <Item.Image size='tiny' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png' />
          <Item.Content>
            <Button as={NavLink} color='green' floated='right'
              onClick={this.handleButtonAddClick}
              disabled={this.state.open}
              to="/guildDetails" >
              View
              <Icon name='right chevron' />
              </Button>
            <Item.Header as='h3'>{this.props.guild.name}</Item.Header>
            <Item.Meta>
              <span className='type'>{this.props.guild.type}</span>
            </Item.Meta>
            <Item.Description>{this.props.guild.description}</Item.Description>
          </Item.Content>
        </Item.Group>
      </Segment >
    );
  }
}

export default YourGuildPattern;