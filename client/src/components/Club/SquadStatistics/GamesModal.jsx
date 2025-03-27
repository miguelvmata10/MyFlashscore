import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const GamesModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modalsdasd!</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
            Close
            </Button>
            <Button variant="primary" onClick={onClose}>
            Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  )
}
export default GamesModal