import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Header, Menu, Popup, Icon, Grid } from 'semantic-ui-react';

class GuildMenu extends React.Component {
  render() {
    return (
      <Grid centered padded>
        <Menu inverted compact>
        <Menu.Item
            as={NavLink}
            name="Completed"
            activeClassName="active"
            to="/guild"
            color='purple'
            exact
          >
            Your Guilds
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            name="Completed"
            activeClassName="active"
            to="/guildJoin"
            color='purple'
            exact
          >
            Join to the Guild
          </Menu.Item>

          <Menu.Item
            as={NavLink}
            name="Completed"
            activeClassName="active"
            to="/guildCreate"
            color='purple'
            exact
          >
            Create a Guild
          </Menu.Item>
        </Menu>
      </Grid>
    );
  }
};

export default GuildMenu;