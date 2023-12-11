/*

import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'nav-item')} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={({ isActive }) => (isActive ? 'active' : 'nav-item')} to="moviedetails">
            Movie Details
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

*/

import React from "react";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import "../App.css";

const Header = () => {
	return (
		<Navbar bg="light" expand="lg" className="fixed-top">
			<Navbar.Brand href="#home" className="ms-5" variant="dark">
				Movies ACM
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ms-auto me-5">
					<LinkContainer to="/">
						<Nav.Link className="me-5">Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/moviedetails">
						<Nav.Link>Movie Details</Nav.Link>
					</LinkContainer>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
