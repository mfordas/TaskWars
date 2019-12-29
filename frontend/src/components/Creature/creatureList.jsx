import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Radio, Header, Segment, Image } from 'semantic-ui-react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';

class CreatureList extends React.Component {
  state = {
    name: 'Wielki Straszny Ogr',
  };

  static contextType = Store;

  render() {
    if (!this.context.hasCharacter) return <Redirect to="/" />;

    return (
      <div>
        <Segment>Elo</Segment>
      </div>
    );
  }
}

export default CreatureList;
