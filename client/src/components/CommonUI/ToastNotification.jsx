import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({showToast, setShowToast, error}) => {
  return (
    <ToastContainer position="top-center" className="p-3">
    <Toast bg="danger" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Erro</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
    </Toast>
</ToastContainer>
  );
}

export default ToastNotification;