import React from 'react';
import { Container } from 'semantic-ui-react';
import YourGuildPattern from './yourGuildPattern';

class YourGuildTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { results: [] }
  }


  arrayToTable = ((arr) => {
    let key = 0;
    return arr.map(elem => {
      return (
        <YourGuildPattern guild={elem} key={key++} />
      );
    })
  })

  componentDidMount() {
  }

  render() {

    return (
      <Container>{this.arrayToTable(this.state.results)}</Container>
    );
  }
}

export default YourGuildTable;