import React from 'react';
import { Menu, Icon, Container, Input, Button, Segment, Form, Grid, Header } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
import YourGuildTable from './yourGuildTable';

const guildCategories = [
  { key: 0, text: 'All' },
  { key: 1, text: 'Physical' },
  { key: 2, text: 'Mental' },
  { key: 3, text: 'Utility' }
];


class MenuGuildFilter extends React.Component {
  constructor(props) {
    super(props);

    this.guildTableRefLeader = React.createRef();
    this.guildTableRefMember = React.createRef();

    this.state = {
      type: 'All',
      tags: '',
      resultsLeader: [],
      resultsMember: [],
    };
  }

  handleItemClickType = (e, { name }) => this.setState({ type: name });

  arrayToMenuType = ((arr) => {
    return arr.map(elem => {
      return (<Menu.Item
        name={elem.text}
        active={this.state.type === elem.text}
        icon={this.state.type === elem.text ? 'check circle outline' : 'circle outline'}
        onClick={this.handleItemClickType}
        key={elem.key}
      />);
    })
  })

  onSearchChange = (event) => {
    const str = event.target.value.toLowerCase();
    this.setState({ tags: str.split(" ").join("_") });
  }

  onSearchButtonClick = (event) => {
    this.fetchGuild();
  }

  fetchGuild = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.getData(body.character_id);
  }

  getData = async (id) => {
    const response = await fetch(`/api/guilds/leader/${id}`, setHeaders());
    const body = await response.json();
    this.setState(
      {
        resultsLeader: body
      }
    )

    const response2 = await fetch(`/api/guilds/members/${id}`, setHeaders());
    const body2 = await response2.json();
    this.setState(
      {
        resultsMember: body2
      }
    )
  }

  componentDidMount() {
    this.fetchGuild();
  }

  componentDidUpdate() {
    this.guildTableRefLeader.current.setState({ results: this.state.resultsLeader });
    this.guildTableRefMember.current.setState({ results: this.state.resultsMember });
  }

  render() {
    return (
      <Grid>
        <Grid.Column mobile={16} computer={10}>
          <Header as='h2'>Guilds, you are a leader of</Header>
          <YourGuildTable ref={this.guildTableRefLeader} />
          
          <Header as='h2'>Guilds in which you are a member</Header>
          <YourGuildTable ref={this.guildTableRefMember} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default MenuGuildFilter;