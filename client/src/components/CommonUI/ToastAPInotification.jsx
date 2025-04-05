import { useEffect, useState } from 'react';
import ToastNotification from './ToastNotification';

const ToastAPInotification = () => {
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
      // Verifica se o utilizador já viu o aviso
      const hasSeenToast = localStorage.getItem('hasSeenToast');
  
      // Se o aviso ainda não foi mostrado
      if (!hasSeenToast) {
        setShowToast(true);
  
        // Marca no localStorage que foi visto
        localStorage.setItem('hasSeenToast', 'true');
      }
    }, []);
  
    return (
      <div>
        <ToastNotification 
          showToast={showToast} 
          setShowToast={setShowToast} 
          type='warning'
          message="Due to API request limits, real-time data is unavailable." 
        />
      </div>
    );
}
export default ToastAPInotification