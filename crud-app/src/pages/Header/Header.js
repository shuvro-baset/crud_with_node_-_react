import React from 'react';
import {  Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './Header.css'
const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">CRUD_WITH_NODE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Link className="menu-item" to='/home'>Home</Link>
                    <Link className="menu-item" to="/users">Users</Link>
                    <Link className="menu-item" to="/add-user">Add User</Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;