import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { signOut } from '../helpers/auth';

const NavbarComponent = ({ user }) => {
  return (
    <div>
      <Navbar collapseOnSelect fixedTop>
        <Navbar.Header>
          <LinkContainer to="/">
            <Navbar.Brand>VApp</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/top">
              <NavItem>Popularne</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>O projekcie</NavItem>
            </LinkContainer>
          </Nav>
          {
            user
            ? (
                <Nav pullRight>
                  <NavDropdown title={user.displayName || user.email || user} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <MenuItem>Twój profil</MenuItem>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                      <MenuItem>Ustawienia</MenuItem>
                    </LinkContainer>
                    <MenuItem divider />
                    <MenuItem onClick={() => signOut()}>Wyloguj się</MenuItem>
                  </NavDropdown>
                  <LinkContainer to="/add">
                    <NavItem>Dodaj</NavItem>
                  </LinkContainer>
                </Nav>
              )
            : (
                <Nav pullRight>
                  <LinkContainer to="/login">
                    <NavItem>Zaloguj się</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem>Zarejestruj się</NavItem>
                  </LinkContainer>
                </Nav>
              )
          }
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
