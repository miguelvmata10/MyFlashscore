import { useState } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchModal = ({ show, onClose }) => {

    const [ name, setName ] = useState('Jogador');

    const handleSelect = (selectedName) => {
        setName(selectedName);
    };

    return (
        <Modal show={show} onHide={onClose} size="md" centered>
        <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title id="contained-modal-title-vcenter">
            Procura
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
            <InputGroup className="mb-3">
                <Form.Control aria-label="Text input with dropdown button" />
                <DropdownButton
                variant="outline-secondary"
                title={name}
                id="input-group-dropdown-2"
                align="end"
                >
                    <Dropdown.Item onClick={() => handleSelect('Jogador')}>Jogador</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect('Clube')}>Clube</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect('Competição')}>Competição</Dropdown.Item>
                </DropdownButton>
            </InputGroup>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-white">
            <BootstrapButton className='btn-custom' onClick={onClose}>
                Pesquisar
            </BootstrapButton>
        </Modal.Footer>
        </Modal>
    );
};

export default SearchModal