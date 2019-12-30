import React from 'react';
import { Segment, Item, Header, Divider } from 'semantic-ui-react';

class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = { userCount: '', tasksCompleted: '' };
    }

    getUsersAndTasks = async () => {
        const userCnt = await fetch('/api/users/count')
            .then(response => response.json());

        const tasksCnt = await fetch('/api/questbook/count')
            .then(response => response.json());

        this.setState({ userCount: userCnt, tasksCompleted: tasksCnt });
    }

    componentDidMount() {
        this.getUsersAndTasks();
    }

    render() {
        return (
            <Segment compact textAlign='center' color='purple' inverted>
                <Segment>
                    <Item>
                        <Header as='h1'>JOIN</Header>
                        <Header as='h4'>coumunity which has</Header>
                        <Header as='h1'>{this.state.userCount} users</Header>
                    </Item>
                    <Divider />
                    <Item>
                        <Header as='h1'>TOGETHER</Header>
                        <Header as='h4'>we were able to complete</Header>
                        <Header as='h1'>{this.state.tasksCompleted} tasks</Header>
                    </Item>
                </Segment>

            </Segment>
        );
    }
}

export default Stats;