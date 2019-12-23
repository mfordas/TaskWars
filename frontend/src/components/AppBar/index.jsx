import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Store from '../../Store';

const AppBar = () => {
  const { isLogged, changeStore, me } = useContext(Store);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    changeStore('isLogged', false);
    changeStore('me', null);
  };
  return (
      <Menu secondary>
        <Menu.Item as={Link}   to="/" >
          <p style={{color: '#800080', fontWeight: 'bold', fontSize: 'large'}}>
            TaskWars</p>
        </Menu.Item>
        <Menu.Item as={NavLink} name="Main Page" to="/" activeClassName="active" exact /><br></br>
        {!isLogged && (
          <>
          <Menu.Item as={NavLink} name="Login" to="/login" activeClassName="active" /><br></br>
          <Menu.Item as={NavLink} name="Register" to="/register" activeClassName="active" /><br></br>
          </>
        )}
        
        {isLogged && (
          <>
          <Menu.Menu>
          <Menu.Item as={NavLink} name="Questbook" to="/questbook" activeClassName="active" /><br></br>
            <Menu.Item as={NavLink} name="Tasks" to="/tasks" activeClassName="active" /><br></br>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item as={Link} name= {me ? me.email: 'user' } to="/profile" />
            <Menu.Item as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
          </>
        )}
      </Menu>
  );
};

export default AppBar;
