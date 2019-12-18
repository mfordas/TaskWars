import React from 'react';
import { NavLink, BrowserRouter, Route, Switch, } from 'react-router-dom';
import { Container, Menu, Popup, Icon } from 'semantic-ui-react';
import TasksTable from './defaultTasks';

const QuestbookContent = () => {


  return (
    <Container text>
        <Menu inverted>
        <Menu.Item 
            as={NavLink}
          name="Completed" 
          activeClassName="active"
          to="/questbook" 
          color = 'blue'
          exact
        >
          All
        </Menu.Item>
        <Menu.Item
            as={NavLink}
          name="Completed" 
          activeClassName="active"
          to="/questbook"
          color = 'green' 
          exact
        >
          Completed
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Uncompleted" 
          color = 'yellow'
          to="/questbook"
        >
          Uncompleted
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Failed" 
          color = 'red'
          to="/questbook"
        >
          Failed
        </Menu.Item>
        <Popup content='Dołóż sobie do pieca!' trigger={
        <Menu.Item
        as={NavLink}
          name="Failed" 
          color = "orange"
          to="/questbook"
          position = "right"
          
        >
          <Icon name='add' />
          Add new task
        </Menu.Item>} />
      </Menu>
    <TasksTable />
  </Container>
  );
};

export default QuestbookContent;
