import React from 'react';
import { Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import StatisticsRow from './StatisticsRow';

class Details extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="detailsDiv">
                    <h1>{this.props.name}</h1>
                    <h3>Level: {this.props.level}</h3>
            </div>
        );
    }
}

export default Details;