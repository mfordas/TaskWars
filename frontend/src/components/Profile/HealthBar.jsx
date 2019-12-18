import React from 'react';
import { Progress, Icon, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


class HealthBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="progressDiv">
                <Header id="progressLabel" as='h4'>Health</Header>
                <Progress id="progressBar" color='red' value={this.props.health} total={100}/>
                <Header id="progressCounter" as='h4'>{this.props.health}/100</Header>
            </div>
        );
    }
}

export default HealthBar