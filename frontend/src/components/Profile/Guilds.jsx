import React from 'react';
import { Table, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Guilds extends React.Component {
    constructor(props) {
        super(props);
    }
    
    renderList() {
        return this.props.guilds.map(name => {
            return (
              <div className="guildName" key={name}>
                   <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Header.Content>
                             {name}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                </Table.Row>
                {/* ------------- */}
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Header.Content>
                             {name}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Header.Content>
                             {name}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Header.Content>
                             {name}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                </Table.Row>
                {/* ---------------- */}
              </div>
            );
          });
    }

    render() {
        return (
            <div className="guild">
                  <Table style={{width: "100%"}} basic='very' celled collapsing>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Character Guilds</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <div className="guildsList">{this.renderList()}</div>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Guilds;