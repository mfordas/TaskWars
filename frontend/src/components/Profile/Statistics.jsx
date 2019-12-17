import React from 'react';
import { Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import StatisticsRow from './StatisticsRow';

class Statistics extends React.Component {
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
                        <StatisticsRow name="Name" image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                        <StatisticsRow name="Level" image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                        <StatisticsRow name="Class" image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                        <StatisticsRow name="Guild" image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                        <StatisticsRow name="Physical Power" image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                        <StatisticsRow name="Magical Power" image="https://cdn3.iconfinder.com/data/icons/halloween-2243/512/Halloween_magic-cap-witch-wizzard-512.png"/>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default Statistics;