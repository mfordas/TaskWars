import React from 'react';
import _ from 'lodash';
import { Button, Icon, Item, Label } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';

class YourGuilds extends React.Component {

  state = {
    name: '',
    guilds: [],
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.getData(body.character_id);
  }

  getData = async (id) => {
    const response = await fetch(`/api/guilds/leader/${id}`, setHeaders());
    const body = await response.json();
    console.log(body);
    this.setState(
      {
        guilds: body
      }
    )
  }


  componentDidMount() {
    this.fetchUser()
  }

  componentDidUpdate() {

  }

  render() {
    return (
      <Item.Group divided>
        {this.state.guilds.map(x => (

          <Item key={x._id} >
            <Item.Image size='tiny' src='https://icons-for-free.com/iconfiles/png/512/ebooks+g+goodreads+social+media+square+icon-1320183296513257763.png' />

            <Item.Content>
              <Item.Header as='a'>{x.name}</Item.Header>
              <Item.Meta>
                <span className='type'>{x.type}</span>
              </Item.Meta>
              <Item.Description>{x.description}</Item.Description>
              <Item.Extra>
                <Button color='green' floated='right'>
                View
          <Icon name='right chevron' />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    );
  }
}

export default YourGuilds;    
