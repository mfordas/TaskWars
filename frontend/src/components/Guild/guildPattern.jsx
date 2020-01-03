import React from 'react';
import { Item, Grid, Container, Segment, Icon, Button, Label, Popup, Step, Header } from 'semantic-ui-react';
import TopPortal from '../Utils/TopPortal';
import setHeaders from '../../utils/setHeaders';
const axios = require('axios');

class GuildPattern extends React.Component {
  constructor(props) {
    super(props);

    this.portalRef = React.createRef();
    this.portalRef2 = React.createRef();
    this.portalRef3 = React.createRef();
    this.state = { open: false }
  }

  handleButtonAddClick = async (e, { name }) => {
    this.setState({ open: true });
    const user = await fetch('/api/users/me', setHeaders())
      .then(response => response.json());
    const character = await fetch(`/api/characters/${user.character_id}`)
      .then(response => response.json());

    const memberToInsert = {
      "name": `${this.props.task.name}`,
      "members": [`${character._id}`],
    };

    if (this.props.task.leader === character._id) {
      this.portalRef2.current.handleOpen();
      return
    }

    if (this.props.task.members.includes(character._id)){
      this.portalRef3.current.handleOpen();
      return
    }

    const res = await axios.put(`/api/guilds/${this.props.task._id}/members`, memberToInsert);

    if (res.status == 200)
      this.portalRef.current.handleOpen();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false });
  }

  render() {
    return (
      <Segment textAlign='left'>
        <Item.Group divided>
          <Item.Image size='tiny' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png' />
          <Item.Content>
            <Button color='purple' floated='right'
              onClick={this.handleButtonAddClick}
              disabled={this.state.open}>
              <Icon name='plus' />
              Join to Guild
              </Button>

            <Item.Header as='h3'>{this.props.task.name}</Item.Header>
            <Item.Meta>
              <span className='type'>{this.props.task.type}</span>
            </Item.Meta>
            <Item.Description>{this.props.task.description}</Item.Description>
          </Item.Content>
        </Item.Group>

        <TopPortal
          ref={this.portalRef}
          header={'Success!'}
          description={`You join to guild ${this.props.task.name}`}
        />
        <TopPortal
          ref={this.portalRef2}
          header={`You are a leader of guild ${this.props.task.name}!`}
        />
        <TopPortal
          ref={this.portalRef3}
          header={`You are a member of guild ${this.props.task.name}!`}
        />
      </Segment >
    );
  }
}

export default GuildPattern;