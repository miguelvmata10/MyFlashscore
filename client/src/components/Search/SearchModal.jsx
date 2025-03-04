import { useState } from 'react';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ToastNotification from '../CommonUI/ToastNotification';

const SearchModal = ({ show, onClose }) => {

    const navigate = useNavigate();
    const [ name, setName ] = useState('Jogador');
    const [ inputValue, setInputValue ] = useState('');
    const [ error, setError ] = useState('');
    const [ showToast, setShowToast ] = useState(false);

    const handleSelect = (selectedName) => {
        setName(selectedName);
    };

    const errorMessages = {
        entryInput: 'Por favor, escreva algo antes de pesquisar.',
        minLengthTreinador: 'Para pesquisar um treinador tem de escrever pelo menos 4 caracteres.',
        minLengthDefault: 'Tem de escrever pelo menos 3 caracteres.',
        invalidQuery: 'A pesquisa não pode conter caracteres especiais.'
    }

    const validadeInput = (name, input) => {
        // A API exige um tamanho minimo de 4 caracteres na pesquisa de um treinador
        const minLength = name === 'Treinador' ? 4 : 3;

        if (input.trim() === '') {
            return 'entryInput';
        } else if (input.trim().length < minLength) {
            return name === 'Treinador' ? 'minLengthTreinador' : 'minLengthDefault';;
        } else if (/[^a-zA-Z0-9 ]/g.test(input)) {
            return 'invalidQuery';
        } else {
            return null;
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();

        const errorKey = validadeInput(name, inputValue);
        if (errorKey) {
            setError(errorMessages[errorKey]); // Substitui o marcador de mínimo
            setShowToast(true);
        } else {
            setError('');
            setShowToast(false);
            onClose();
            setInputValue('');
            navigate(`/${name}/${encodeURIComponent(inputValue)}`);
        }
    }

    // Para poder pesquisar também usando o 'Enter'
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    // Necessário para poder limpar o campo de pesquisa, também quando o utilizador fecha o modal
    const handleClose = () => {
        onClose();
        setInputValue('');
    }

    return (
        <>
            <ToastNotification showToast={showToast} setShowToast={setShowToast} error={error} />
            <Modal show={show} onHide={handleClose} size="md" centered>
            <Modal.Header closeButton className="bg-dark text-white" style={{ borderBottom: 'none' }}>
                <Modal.Title id="contained-modal-title-vcenter">
                Procura
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark text-white modal-body">
                <InputGroup className="mb-3">
                    <Form.Control 
                        aria-label="Text input with dropdown button"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} 
                        onKeyDown={handleKeyPress}
                    />
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
                        <Dropdown.Item onClick={() => handleSelect('Competicao')}>
                            Competição
                        </Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </Modal.Body>
            <Modal.Footer className="bg-dark text-white modal-footer">
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