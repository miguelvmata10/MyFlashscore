import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o css para o React-Bootstrap

createRoot(document.getElementById('root')).render(<App />);
