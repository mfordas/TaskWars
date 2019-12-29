import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Store from '../../Store';

const AppBar = () => {
  const { isLogged, changeStore, me, hasCharacter } = useContext(Store);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    changeStore('isLogged', false);
    changeStore('me', null);
    changeStore('hasCharacter', null)
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
        
        {(isLogged && !hasCharacter) && (
          <>
          <Menu.Menu>
            <Menu.Item as={NavLink} name="Create Character" to="/characterCreation" activeClassName="active" /> 
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item as={Link} name= {me ? me.name: 'user' } to="/profile" />
            <Menu.Item as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
          </>
        )}

        {(isLogged && hasCharacter) && (
          <>
          <Menu.Menu>
            <Menu.Item as={NavLink} name="Questbook" to="/questbook" activeClassName="active" /><br></br>
            <Menu.Item as={NavLink} name="Tasks" to="/tasks" activeClassName="active" /><br></br>
            <Menu.Item as={NavLink} name="Shop" to="/shop" activeClassName="active" /><br></br>
            <Menu.Item as={NavLink} name="Inventory" to="/inventory" activeClassName="active" /><br></br>
            <Menu.Item as={NavLink} name="Creatures" to="/creatures" activeClassName="active" /><br></br>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item as={Link} name= {me ? me.name: 'user' } to="/profile" />
            <Menu.Item as={Link} name="Log out" to="/" onClick={handleLogout} />
          </Menu.Menu>
          </>
        )}
      </Menu>
  );
};

export default AppBar;
