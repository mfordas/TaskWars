import React from 'react';
import { Redirect } from 'react-router-dom';
import { Header, Segment, Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import setHeaders from '../../utils/setHeaders';
import Store from '../../Store';
import CreaturesTable from './CreaturesTable'


class CreatureList extends React.Component {

  
  state = {
    name: '',
    results: [],
  };

  creaturesTableRef = React.createRef();
  static contextType = Store;


  getCreatures = async () =>{
    await axios({
      url:`api/creatures/${this.state.name}`,
      method: 'get',
      headers: setHeaders(),
    }).then((response) => {
      this.setState({ results: response.data});
    }, (error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getCreatures();
  }

  componentDidUpdate() {
    this.creaturesTableRef.current.setState({ results: this.state.results });
  }

  onSearchChange = (e) =>{
    const input = e.target.value.toLowerCase();
    this.setState({ name: input.split(" ").join("_") });
  }

  onSearchButtonClick = (e) =>{
    this.getCreatures();
  }

  render() {
    if (!this.context.hasCharacter) return <Redirect to="/" />;

    return (
      <div>
        <Segment>
          <Header>Creature Type</Header>
          <Input fluid placeholder="Name" icon="search" onChange={this.onSearchChange} />
          <Button color = 'blue' onClick ={this.onSearchButtonClick}>
            Search
          </Button>
        </Segment>
        <Segment>
          <CreaturesTable ref={this.creaturesTableRef} />
        </Segment>
      </div>
    );
  }
}

export default CreatureList;
