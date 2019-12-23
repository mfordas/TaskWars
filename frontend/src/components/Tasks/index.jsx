import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import MenuTasksFilter from './MenuTasksFilter';
import TasksTable from './TasksTable';

const TasksContent = () => {
    return (
        <Container>
            <Grid columns='10'>
                <Grid.Column width='4'>
                    <MenuTasksFilter />
                </Grid.Column>
                <Grid.Column width='10'>
                    <TasksTable />
                </Grid.Column>
                
            </Grid>

        </Container>
    );
}

export default TasksContent;