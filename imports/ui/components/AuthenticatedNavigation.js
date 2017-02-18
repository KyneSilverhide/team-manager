import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/runs">
        <NavItem eventKey={ 2 } href="/runs">Runs</NavItem>
      </LinkContainer>
      <LinkContainer to="/versions">
        <NavItem eventKey={ 3 } href="/">Versions</NavItem>
      </LinkContainer>
      <LinkContainer to="/teams">
        <NavItem eventKey={ 4 } href="/teams">Equipes</NavItem>
      </LinkContainer>
      <LinkContainer to="/developers">
        <NavItem eventKey={ 5 } href="/documents">Développeurs</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 6 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 6.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
