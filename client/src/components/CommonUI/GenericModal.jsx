import { Modal, Button as BootstrapButton } from 'react-bootstrap';

const GenericModal = ({
    show,
    handleClose,
    title,
    children,
    hasFooter,
    footerFunction,
    footerButtonName
}) => {
    
    return (
        <>
            <Modal show={show} onHide={handleClose} size="md" centered>
                <Modal.Header closeButton className="bg-dark text-white" style={{ borderBottom: 'none' }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark text-white modal-body">
                    {children}
                </Modal.Body>
                {hasFooter && <Modal.Footer className="bg-dark text-white modal-footer">
                    <BootstrapButton 
                        className='btn-custom'
                        onClick={footerFunction}>
                            {footerButtonName}
                    </BootstrapButton>
                </Modal.Footer>}
            </Modal>
        </>
    );
};

export default GenericModal