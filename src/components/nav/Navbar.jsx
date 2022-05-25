import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import NavLink from "./NavLink";
import NavBrand from "./NavBrand";
import NavDropdownLink from "./NavDropdownLink";
import NavButton from "./NavButton";
import { navbarStyle, active } from "./NavBar.module.css";
import { logout } from "../../utilities/auth";

const NavBar = ({ currentPageName }) => {
  const accountDropdown = [
    { name: "Profile Stats", dest: "/playlists" },
    { name: "Top Tracks", dest: "/playlists" },
    { name: "Top Artists", dest: "/playlists" },
    { name: "Recently Played", dest: "/playlists" },
    { name: "Playlists", dest: "/playlists" },
    { name: "Recommendations", dest: "/playlists" },
  ];

  const pageInDropdown = accountDropdown.some((element) => {
    if (element.name === currentPageName) {
      return true;
    }
  });

  return (
    <Navbar expand="lg" className={navbarStyle}>
      <Container fluid>
        <NavBrand>
          <div>Spotify Data</div>
        </NavBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <NavLink
              to="/"
              pageNickname="Home"
              currentPageName={currentPageName}
            />
            <NavLink
              to="/songdata"
              pageNickname="Song Data"
              currentPageName={currentPageName}
            />
            <NavDropdown
              title={
                <span className={pageInDropdown ? active : ""}>
                  My Spotify Account
                </span>
              }
              id="account-dropdown"
            >
              {accountDropdown.map((item) => {
                return (
                  <NavDropdownLink
                    key={item.name}
                    to={item.dest}
                    pageNickname={item.name}
                    currentPageName={currentPageName}
                  />
                );
              })}
            </NavDropdown>
          </Nav>
          <NavButton onClick={logout} styles="ms-auto">
            Logout
          </NavButton>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
