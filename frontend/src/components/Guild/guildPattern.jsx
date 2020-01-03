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
      "name": `${this.props.guild.name}`,
      "members": [`${character._id}`],
    };

    if (this.props.guild.leader === character._id) {
      this.portalRef2.current.handleOpen();
      return
    }

    if (this.props.guild.members.includes(character._id)) {
      this.portalRef3.current.handleOpen();
      return
    }

    const res = await axios.put(`/api/guilds/${this.props.guild._id}/members`, memberToInsert);

    if (res.status == 200)
      this.portalRef.current.handleOpen();
    await new Promise(res => setTimeout(res, 3500));
    this.setState({ open: false });
  }

  render() {
    return (
      <Container>
        <Header as='h2'>Guilds, you are a leader of</Header>
        <Segment textAlign='left' inverted>
          <Item>
            <Item.Image size='mini' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png'
              style={{ display: 'inline-block' }}>
            </Item.Image>
            <Item.Header style={{ color: 'white', display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
              {this.props.guild.name}
            </Item.Header>
            <Popup content='Type' trigger={
              <Label color='orange'>
                {this.props.guild.type}
              </Label>
            } />

            <Item.Description>
              <Segment.Group>
                <Segment
                  inverted
                  textAlign='center'
                  color='purple'
                  style={{ padding: '2px 0px 0px 6px' }}>
                  <Header as='h5'>
                    Description
                        </Header>
                </Segment>
                <Segment>
                  {this.props.guild.description}<br />
                </Segment>
              </Segment.Group>
            </Item.Description>

            <Item.Extra>
              <Button
                fluid
                icon
                color='green'
                labelPosition='right'
                onClick={this.handleButtonAddClick}
                disabled={this.state.open}>
                <Icon name='plus' />
                Join to Guild
                </Button>
            </Item.Extra>
          </Item>
        </Segment>

        <TopPortal
          ref={this.portalRef}
          header={'Success!'}
          description={`You join to guild ${this.props.guild.name}`}
        />
        <TopPortal
          ref={this.portalRef2}
          header={`You are a leader of guild ${this.props.guild.name}!`}
        />
        <TopPortal
          ref={this.portalRef3}
          header={`You are a member of guild ${this.props.guild.name}!`}
        />
      </Container>
    );
  }
}

export default GuildPattern;