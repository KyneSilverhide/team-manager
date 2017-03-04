import React from 'react';
import { browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';
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
        <NavItem eventKey={ 2 } href="/runs"><FontAwesome name='line-chart'/> Runs</NavItem>
      </LinkContainer>
      <LinkContainer to="/versions">
        <NavItem eventKey={ 3 } href="/"><FontAwesome name='calendar'/> Versions</NavItem>
      </LinkContainer>
      <LinkContainer to="/teams">
        <NavItem eventKey={ 4 } href="/teams"><FontAwesome name='users'/> Equipes</NavItem>
      </LinkContainer>
      <LinkContainer to="/developers">
        <NavItem eventKey={ 5 } href="/documents"><FontAwesome name='user'/> Développeurs</NavItem>
      </LinkContainer>
      <LinkContainer to="/holidays">
        <NavItem eventKey={ 6 } href="/holidays"><FontAwesome name='plane'/> Congés</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 7 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 7.1 } onClick={ handleLogout }><FontAwesome name='sign-out'/> Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;
