import React from 'react';
import { NavLink, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container, Header, Menu, Popup, Icon } from 'semantic-ui-react';
import GuildCreating from './guildCreating';
import GuildJoin from './guildJoin';
import GuildMenu from './guildMenu';
import YourGuilds from './yourGuilds';

const GuildContent = () => {
  return (
    <BrowserRouter>
      <Container text>
        <GuildMenu />
        <Switch>
          <Route exact path="/guildCreate" component={GuildCreating} />
          <Route exact path="/guildJoin" component={GuildJoin} />
          <Route exact path="/guild" component={YourGuilds} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default GuildContent;