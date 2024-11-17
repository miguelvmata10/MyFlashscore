import React, { useState } from 'react';
import './Sidebar.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Countries from './Countries';
import Leagues from './Leagues';

const Sidebar = () => {

    const [selected, setSelected] = useState('ligas');

    const handleButtonState = (button) => {
        setSelected(button);
    };

    const isActiveButton = (button) => {
        return button === selected ? "active" : "";
    }

    return (
        <>
            <div className='sidebar'>
                <ButtonGroup size='md'>
                    <Button className={isActiveButton('ligas')} onClick={() => handleButtonState('ligas')}>Ligas</Button>
                    <Button className={isActiveButton('paises')} onClick={() => handleButtonState('paises')}>Países</Button>
                </ButtonGroup> 
            </div>
            {selected === 'paises' ? (
                <div className='countries'>
                    <Countries />
                </div>
            ) : 
            <div className='leagues'> 
                <Leagues/> 
            </div>}
        </>
    )
}

export default Sidebar;