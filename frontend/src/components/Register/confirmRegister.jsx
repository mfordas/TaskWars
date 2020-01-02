import React from 'react'
import { Menu, Popup, Icon, Message, Grid } from 'semantic-ui-react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';

class Confirmed extends React.Component {
  render() {
    return (
      <Grid centered>
      <Message
        success
        header='Account created, check your email'
      />
    </Grid>
    );
  }
};

export default Confirmed