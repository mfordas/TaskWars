import React, { useContext, Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, Header, Menu } from 'semantic-ui-react';
import Store from '../../Store';
import TasksTable from './defaultTasks';


const QuestbookContent = () => {
//   const { isLogged, changeStore, me } = useContext(Store);
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('id');
//     changeStore('isLogged', false);
//     changeStore('me', null);
//   };

  return (
    <Container text>
        <Menu secondary>
        <Menu.Item
            as={NavLink}
          name="Completed" 
          activeClassName="active"
          to="/" 
          exact
        >
          Completed
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Uncompleted" 
          to="/tasks"
        >
          Uncompleted
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Failed" 
          to="/tasks"
        >
          Failed
        </Menu.Item>
      </Menu>
    <Header as='h2'>Header</Header>
    <p>
      Paragraph1
    </p>
    <p>
      Paragraph2
    </p>
    <TasksTable />
  </Container>
  );
};

export default QuestbookContent;
