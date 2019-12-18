import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';
import TasksTable from './defaultTasks';

const QuestbookContent = () => {


  return (
    <Container text>
        <Menu secondary>
        <Menu.Item
            as={NavLink}
          name="Completed" 
          activeClassName="active"
          to="/questbook" 
          exact
        >
          All
        </Menu.Item>
        <Menu.Item
            as={NavLink}
          name="Completed" 
          activeClassName="active"
          to="/questbook/completed" 
          exact
        >
          Completed
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Uncompleted" 
          to="/questbook/uncompleted"
        >
          Uncompleted
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Failed" 
          to="/questbook/failed"
        >
          Failed
        </Menu.Item>
      </Menu>
    <TasksTable />
  </Container>
  );
};

export default QuestbookContent;
