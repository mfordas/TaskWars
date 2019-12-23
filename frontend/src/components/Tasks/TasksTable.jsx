import React from 'react';
import { Container } from 'semantic-ui-react';
import TaskPattern from './TaskPattern';

class TasksTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = { results: [] }
    }

    fetchTasks = async () => {
        const response = await fetch(`/api/tasks`);
        const tasks = await response.json();
        this.setState({ results: tasks });
        console.log(this.state.results);
    }

    arrayToTable = ((arr) => {
        let key = 0;
        return arr.map(elem => {
            return (
                <TaskPattern task={elem} key={key++}/>
            );
        })
    })

    componentDidMount() {
        this.fetchTasks();
    }

    render() {

        return (
            <Container>{this.arrayToTable(this.state.results)}</Container>
        );
    }
}

export default TasksTable;