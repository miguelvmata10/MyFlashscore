import React, { useState } from 'react';
import SearchButton from './SearchButton';
import SearchModal from '../Search/SearchModal';

const SearchLayout = () => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <SearchButton onClick={handleShowModal} />
            <SearchModal show={showModal} onClose={handleCloseModal} />
        </>
    )
}

export default SearchLayout