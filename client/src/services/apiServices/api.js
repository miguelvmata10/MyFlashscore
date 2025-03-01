import axios from 'axios';

// todas as chamadas para a API têm o formato guardado em API_BASE_URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// será usado em todas as chamadas à API -> cria uma instância do Axios
const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;