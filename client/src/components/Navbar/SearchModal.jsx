import { useState } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ToastNotification from '../SearchResults/ToastNotification';

const SearchModal = ({ show, onClose }) => {

    const navigate = useNavigate();
    const [ name, setName ] = useState('Jogador');
    const [ inputValue, setInputValue ] = useState('');
    const [ error, setError ] = useState('');
    const [ showToast, setShowToast ] = useState(false);

    const handleSelect = (selectedName) => {
        setName(selectedName);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            setError('Por favor, escreva algo antes de pesquisar.');
            setShowToast(true);
        } else if (inputValue.trim().length < 3) {
            setError('Tem de escrever pelo menos 3 caracteres.');
            setShowToast(true);
        } else {
            setError('');
            setShowToast(false);
            onClose();
            navigate(`/results/${name}/${encodeURIComponent(inputValue)}`);
        }
    }

    return (
        <>
            <ToastNotification showToast={showToast} setShowToast={setShowToast} error={error}/>
            <Modal show={show} onHide={onClose} size="md" centered>
            <Modal.Header closeButton className="bg-dark text-white">
                <Modal.Title id="contained-modal-title-vcenter">
                Procura
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white">
                <InputGroup className="mb-3">
                    <Form.Control 
                        aria-label="Text input with dropdown button"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                    <DropdownButton
                    variant="outline-secondary"
                    title={name}
                    id="input-group-dropdown-2"
                    align="end"
                    >
                        <Dropdown.Item onClick={() => handleSelect('Jogador')}>
                            Jogador
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('Treinador')}>
                            Treinador
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('Clube')}>
                            Clube
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('Competição')}>
                            Competição
                        </Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white">
                <BootstrapButton 
                    className='btn-custom'
                    onClick={handleSearch}>
                        Pesquisar
                </BootstrapButton>
            </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchModal