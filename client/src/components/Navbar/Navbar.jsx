import React from 'react';
import logo from '../../assets/logo.png';
import '../Navbar/Navbar.css'
import Navbar from 'react-bootstrap/Navbar';
import SearchLayout from './SearchLayout';
import FallbackImage from '../CommonUI/FallbackImage';

const CustomNavbar = () => (
    <Navbar expand="lg" className='navbar mb-4'>
        <Navbar.Brand href='/'>
            <FallbackImage src={logo} className="logo ps-3" alt="logo"/>
        </Navbar.Brand>
        
        <div className='ms-auto p-2'>
            <SearchLayout />
        </div>
    </Navbar>
);

export default CustomNavbar;
 