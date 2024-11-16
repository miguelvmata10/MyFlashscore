import React from 'react';
import logo from '../../assets/logo.png';
import '../Navbar/Navbar.css'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CustomNavbar = () => (
    <Navbar expand="lg" className='navbar '>
        <Navbar.Brand href='/sdf'>
            <img src={logo} className="logo" alt="logo"/>
        </Navbar.Brand>
        
        <div className='ms-auto p-2'>
            <Form className="d-flex">
                <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                <Button className="me-2" variant="dark">Search</Button>
            </Form>
        </div>
    </Navbar>
);

export default CustomNavbar;
 