import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sidebar.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Countries from './Countries';

const Sidebar = () => {

    const [selected, setSelected] = useState('ligas');
    const [countries, setCountries] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/competitions/countries");
            setCountries(response.data.response);
            console.log(response.data.response);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    const handleButtonState = (button) => {
        setSelected(button);
    };

    const isActiveButton = (button) => {
        return button === selected ? "active" : "";
    }

    return (
        <>
            <div className='sidebar'>
                <ButtonGroup size='lg'>
                    <Button className={isActiveButton('ligas')} onClick={() => handleButtonState('ligas')}>Ligas</Button>
                    <Button className={isActiveButton('paises')} onClick={() => handleButtonState('paises')}>Países</Button>
                </ButtonGroup> 
            </div>
            <div className='countries'>
                <Countries countries={countries} />
            </div>
        </>
    )
}

export default Sidebar;