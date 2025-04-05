import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({showToast, setShowToast, message, type}) => {
  return (
    <ToastContainer position="top-center" className="p-3">
    <Toast bg="danger" onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
        <Toast.Header>
          {type === 'warning' ? 
            (<strong className="me-auto">Warning ⚠️</strong>) : 
            (<strong className="me-auto">Error ❌</strong>)
          }
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
    </Toast>
</ToastContainer>
  );
}

export default ToastNotification;