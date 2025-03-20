import React from 'react';
import logo from '../../assets/logo.png';
import { Image } from 'react-bootstrap';
import '../Navbar/Navbar.css'
import Navbar from 'react-bootstrap/Navbar';
import SearchLayout from './SearchLayout';

const CustomNavbar = () => (
    <Navbar expand="lg" className='navbar mb-4'>
        <Navbar.Brand href='/'>
            <Image src={logo} loading='lazy' className="logo ps-3" alt="logo"/>
        </Navbar.Brand>
        
        <div className='ms-auto p-2'>
            <SearchLayout />
        </div>
    </Navbar>
);

export default CustomNavbar;
 