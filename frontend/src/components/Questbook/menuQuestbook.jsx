import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Menu, Popup, Icon } from 'semantic-ui-react';

class MenuQuestbook extends React.Component {
    render() {
  return (
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
          to="/questbook/completed"
          color = 'green' 
          exact
        >
          Completed
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Uncompleted" 
          color = 'yellow'
          to="/questbook/uncompleted"
        >
          Uncompleted
        </Menu.Item>

        <Menu.Item
        as={NavLink}
          name="Failed" 
          color = 'red'
          to="/questbook/failed"
        >
          Failed
        </Menu.Item>
        <Popup content='Dołóż sobie do pieca!' trigger={
        <Menu.Item
        as={NavLink}
          name="Failed" 
          color = "orange"
          to="/questbook/addtask"
          position = "right"
          
        >
          <Icon name='add' />
          Add new task
        </Menu.Item>} />
      </Menu>
 
  );
}
};

export default MenuQuestbook;