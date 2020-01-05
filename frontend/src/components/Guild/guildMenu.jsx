import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Header, Menu, Popup, Icon, Grid } from 'semantic-ui-react';

class GuildMenu extends React.Component {

  render() {
    return (
        <Menu inverted>
          <Menu.Item
            as={NavLink}
            name="Completed"
            activeClassName="active"
            to="/guild"
            color='brown'
            exact
          >
            Your Guilds
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            name="Completed"
            activeClassName="active"
            to="/guildJoin"
            color='brown'
            exact
          >
            Find Guild
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            name="Completed"
            activeClassName="active"
            to="/guildCreate"
            color='brown'
            exact
          >
            Create a Guild
          </Menu.Item>
        </Menu>
    );
  }
};

export default GuildMenu;