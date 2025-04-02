import React, { useEffect } from 'react';
import useApiRequest from '../../../../../hooks/useApiRequest';
import { fetchHeadToHeadStats } from '../../../../../services/TeamsService';
import LoadingScreen from '../../../../CommonUI/LoadingScreen';
import NotFound from '../../../../CommonUI/NotFound';
import HeadToHeadModal from './HeadToHeadModal';

const HeadToHead = ({ h2h, show, onClose }) => {
    const { data: headToheadData, loading, error, fetchData } = useApiRequest(fetchHeadToHeadStats);

    useEffect(() => {
        if (h2h) {
            fetchData(h2h);    
        }
    }, [h2h, fetchData])

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!headToheadData) return <NotFound />;

    return (
        <HeadToHeadModal headToheadData={headToheadData} show={show} onClose={onClose} />
    )
}
export default HeadToHead