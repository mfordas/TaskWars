import React from 'react';
import { Progress, Icon, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';


class HealthBar extends React.Component {
    state = {
        value: 50,
        total: 100,
    }
    
    styleDiv = {
        width: '40%',
        margin: 0,
        display: "flex",
        flexWrap: "wrap"
    }

    styleHealth = {
        width: '100%',
        margin: 0,
        marginBottom: 5
    }

    styleBar = {
        width: '60%',
        display: "inline-block",
        margin: 0,
    }

    styleCounter = {
        width: '30%',
        margin: 0,
        display: "inline-block",
        marginLeft: 'auto'
    }

    render() {
        return (
            <div style={this.styleDiv}>
                <Header style={this.styleHealth} as='h3'>Health</Header>
                <Progress style={this.styleBar} color='red' value={this.state.value} total={this.state.total}/>
                <Header style={this.styleCounter} as='h3'>{this.state.value}/{this.state.total}</Header>
            </div>
        );
    }
}

export default HealthBar