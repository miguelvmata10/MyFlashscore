import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ToastNotification from '../CommonUI/ToastNotification';
import GenericModal from '../CommonUI/GenericModal';

const SearchModal = ({ show, onClose }) => {

    const navigate = useNavigate();
    const [ name, setName ] = useState('player');
    const [ inputValue, setInputValue ] = useState('');
    const [ error, setError ] = useState('');
    const [ showToast, setShowToast ] = useState(false);

    const handleSelect = (selectedName) => {
        setName(selectedName);
    };

    const errorMessages = {
        entryInput: 'Please enter something before searching.',
        minLengthTreinador: 'To search for a coach, you must enter at least 4 characters.',
        minLengthDefault: 'You must enter at least 3 characters.',
        invalidQuery: 'The search cannot contain special characters.'
    };

    const validadeInput = (name, input) => {
        // A API exige um tamanho minimo de 4 caracteres na pesquisa de um treinador
        const minLength = name === 'coach' ? 4 : 3;

        if (input.trim() === '') {
            return 'entryInput';
        } else if (input.trim().length < minLength) {
            return name === 'coach' ? 'minLengthTreinador' : 'minLengthDefault';;
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
            navigate(`/search/${name}/${encodeURIComponent(inputValue)}`);
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
            <ToastNotification showToast={showToast} setShowToast={setShowToast} message={error} type='error' />
            
            <GenericModal show={show} handleClose={handleClose} title='Search' hasFooter={true} footerFunction={handleSearch} footerButtonName='Search'>
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
                        <Dropdown.Item onClick={() => handleSelect('player')}>
                            player
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('coach')}>
                            coach
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('club')}>
                            club
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSelect('competition')}>
                            competition
                        </Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </GenericModal>
        </>
    );
};

export default SearchModal