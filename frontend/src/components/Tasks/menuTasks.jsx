import React from 'react';
import { Menu, Icon, Container, Input, Button, Segment, Pagination } from 'semantic-ui-react';
import setHeaders from '../../utils/setHeaders';

const tasksTypes = [
    { key: 0, text: 'All', value: 0 },
    { key: 1, text: 'Daily', value: 1 },
    { key: 2, text: 'Weekly', value: 2 },
    { key: 3, text: 'Monthly', value: 3 },
    { key: 4, text: 'Events', value: 4 },
    { key: 5, text: 'Encounters', value: 5 }
];

const tasksCategories = [
    { key: 0, text: 'All', value: 0 },
    { key: 1, text: 'Physical', value: 1 },
    { key: 2, text: 'Mental', value: 2 },
    { key: 3, text: 'Utility', value: 3 }
];


class MenuTasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: 'All',
            type: 'All',
            tags: ''
        };
    }

    handleItemClickType = (e, { name }) => this.setState({ type: name });
    handleItemClickCategory = (e, { name }) => this.setState({ category: name });

    arrayToMenuType = ((arr) => {
        return arr.map(elem => {
            return (<Menu.Item
                name={elem.text}
                active={this.state.type === elem.text}
                icon={this.state.type === elem.text ? 'check circle outline' : 'circle outline'}
                onClick={this.handleItemClickType}
                key={elem.key}
            />);
        })
    })

    arrayToMenuCategory = ((arr) => {
        return arr.map(elem => {
            return (<Menu.Item
                name={elem.text}
                active={this.state.category === elem.text}
                icon={this.state.category === elem.text ? 'check circle outline' : 'circle outline'}
                onClick={this.handleItemClickCategory}
                key={elem.key}
            />);
        })
    })

    onSearchChange = (event) => {
        const str = event.target.value.toLowerCase();
        this.setState({ tags: str.split(" ").join("_") });
    }

    onSearchButtonClick = (event) => {
        this.fetchTasks();
    }

    fetchTasks = async () => {
        const response = await fetch(`/api/tasks/${this.state.category}&${this.state.type}&${this.state.tags}`, setHeaders());
        const tasks = await response.json();
        console.log(tasks);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <Container className='filterWrapper'>
                <Segment style={{display: 'inline-block'}}>
                    <Input fluid placeholder='Tags...' icon='search' onChange={this.onSearchChange} />

                    <Menu vertical inverted>
                        <Menu.Item header><Icon name='bars' fitted />Sort by type</Menu.Item>
                        {this.arrayToMenuType(tasksTypes)}
                    </Menu>

                    <Menu vertical inverted>
                        <Menu.Item header><Icon name='bars' fitted />Sort by category</Menu.Item>
                        {this.arrayToMenuCategory(tasksCategories)}
                    </Menu>

                    <Button fluid animated color='blue' size='huge' onClick={this.onSearchButtonClick}>
                        <Button.Content visible>Search</Button.Content>
                        <Button.Content hidden>
                            <Icon name='search' />
                        </Button.Content>
                    </Button>

                    {/* <Pagination
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={10}
                    /> */}
                </Segment>
            </Container>
        );
    }
}

export default MenuTasks;