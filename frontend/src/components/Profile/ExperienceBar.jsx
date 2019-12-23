import React from 'react';
import { Progress, Icon, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import "./style.css";


class ExperienceBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="progressDiv">
                <Header id="progressLabel" as='h4'>Experience</Header>
                <Progress id="progressBar" color='yellow' value={this.props.exp} total={this.props.expRequired}/>
                <Header id="progressCounter" as='h4'>{this.props.exp}/{this.props.expRequired}</Header>
            </div>
        );
    }
}

export default ExperienceBar