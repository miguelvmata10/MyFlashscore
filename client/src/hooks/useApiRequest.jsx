import { useState, useCallback } from 'react';

const useApiRequest = (apiFunction) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (...params) => {  // Agora podemos passar múltiplos parâmetros
            setLoading(true);
            setError(null);
            try {
                const response = await apiFunction(...params); // Passa os parâmetros corretamente
                setData(response.response || response); 
            } catch (err) {
                setError(err);
                console.error('Erro ao carregar dados:', err);
            } finally {
                setLoading(false);
            }
        },
        [apiFunction]
    );

    return { data, loading, error, fetchData };
};

export default useApiRequest;
