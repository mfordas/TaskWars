import React from 'react';
import { Container, Grid, GridColumn, GridRow } from 'semantic-ui-react';
import MenuTasks from './menuTasks';

const TasksContent = () => {
    return (
        <Container>
            <MenuTasks />
        </Container>
    );
}

export default TasksContent;