import React from 'react';
import {Navbar, Container, Nav } from 'react-bootstrap';
// @desc    Navigation module to show all options for users

const NavBar = ({user}) => (
    <Navbar bg="primary" expand="lg" variant="dark">
    <Container>
        <Navbar.Brand href="/">Student App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/studentlist">Student Info</Nav.Link>
                <Nav.Link href="/universitiesList">Universities</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
);

export default NavBar;