import React from 'react';
import { Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import StatisticsRow from './StatisticsRow';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                  <Table basic='very' celled collapsing>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Character Statistic</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <StatisticsRow name="Class" value={this.props.class} image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                        <StatisticsRow name="Physical Power" value={this.props.physical} image="https://image.flaticon.com/icons/png/512/834/premium/834240.png"/>
                        <StatisticsRow name="Magical Power" value={this.props.magical} image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Statistics;