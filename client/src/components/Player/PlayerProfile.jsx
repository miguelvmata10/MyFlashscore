import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useApiRequest from '../../hooks/useApiRequest';
import { fetchPlayerData } from '../../services/PeopleService';

const PlayerProfile = () => {
    const { playerID } = useParams();
    const { data: playerData, loading, error, fetchData } = useApiRequest(fetchPlayerData);

    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
        console.log('DADOS DO JOGADOR: ', playerData);
    }, [playerID, fetchData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerData) return <p>Nenhum dado disponível.</p>;

    return (
        <div>PlayerProfile</div>
    )
}
export default PlayerProfile