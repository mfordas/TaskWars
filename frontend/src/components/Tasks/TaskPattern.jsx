import React from 'react';
import {Item, Segment, Icon, Button, Label, Popup } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';
const axios = require('axios');

class TaskPattern extends React.Component {

    handleButtonAddClick = async (e, { name }) => {
        const userFetch = await fetch('/api/users/me', setHeaders());
        const user = await userFetch.json();
        const characterFetch = await fetch(`/api/characters/${user.character_id}`);
        const character = await characterFetch.json();
        
        await axios.put(`/api/questbook/${character.questbook_id}/task`, {'_id': `${this.props.task._id}`});
        await axios.put(`/api/tasks/${this.props.task._id}/status`, {'status': 'in_progress'});
    }

    pickImage() {
        if (this.props.task.type === 'Physical')
            return { name: 'bicycle', color: 'red', size: 'big' };

        if (this.props.task.type === 'Mental')
            return { name: 'book', color: 'brown', size: 'big' };

        if (this.props.task.type === 'Utility')
            return { name: 'globe', color: 'blue', size: 'big' };

        return { name: 'object group', color: 'orange', size: 'big' };
    }

    render() {
        return (
            <Segment>
                <Item>
                    <Item.Image style={{ display: 'inline-block' }}><Icon {...this.pickImage()} /></Item.Image>
                    <Item.Header style={{ display: 'inline-block', margin: '0 8px 10px 8px', position: 'relative', top: '5px' }} as={'h1'}>
                        {this.props.task.name}
                    </Item.Header>

                    <Popup content='Gold' trigger={
                        <Label color='yellow'>
                            <Icon name='dot circle' />
                            {this.props.task.reward.gold}
                        </Label>
                    } />

                    <Popup content='Experience' trigger={
                        <Label color='violet'>
                            <Icon name='star' />
                            {this.props.task.reward.exp}
                        </Label>
                    } />

                    <Item.Meta>
                        <span className='type'>Type: {this.props.task.type}</span><br />
                        <span className='category'>Category: {this.props.task.category}</span>
                    </Item.Meta>

                    <Item.Description>
                        {this.props.task.description}
                    </Item.Description>

                    <Item.Extra>
                        <Button fluid icon color='blue' labelPosition='right' onClick={this.handleButtonAddClick}>
                            <Icon name='plus' />
                            Add to questbook
                    </Button>
                    </Item.Extra>

                </Item>

            </Segment>
        );
    }
}

export default TaskPattern;