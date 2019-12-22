import React from 'react';
import { Header, Image, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class StatisticsRow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Table.Row>
            <Table.Cell>
            <Header as='h4' image>
                <Image src={this.props.image} rounded size='mini' />
                <Header.Content>
                {this.props.name}
                </Header.Content>
            </Header>
            </Table.Cell>
            <Table.Cell id='statisticValue'>
                <h4>{this.props.value}</h4>
            </Table.Cell>
            </Table.Row>
        );
    }
}

export default StatisticsRow;


