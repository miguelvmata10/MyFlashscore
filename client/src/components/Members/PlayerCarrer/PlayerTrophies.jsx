import React, { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { fetchPlayerTrophies } from '../../../services/PeopleService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest';
import NotFound from '../../CommonUI/NotFound';

const PlayerTrophies = () => {
    const { playerID } = useParams();
    const { data: playerTrophies, loading, error, fetchData } = useApiRequest(fetchPlayerTrophies);
  
    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
    }, [playerID, fetchData]);
  
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTrophies || playerTrophies.length === 0 ) return <NotFound />;
  
    // necessário filtrar apenas os troféus ganhos, pois a API retorna campeonatos ganhos e vice-campeonatos
    const filteredPlayerTrophies = playerTrophies.filter(trophy => trophy.place === 'Winner');
    
    return (
        <Container fluid className="container rounded-4">
            <h5 className='mb-3 heading-border'>{filteredPlayerTrophies.length} trophies won</h5>

            {filteredPlayerTrophies.length > 0 && (
                <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    <Table striped hover responsive variant="dark" className='text-center'>
                        <thead>
                            <tr>
                                <th>Época</th>
                                <th>País</th>
                                <th>Competição</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredPlayerTrophies.map((trophy, index) => (
                            <tr key={index}>
                                <td>{trophy.season}</td>
                                <td>{trophy.country}</td>
                                <td>{trophy.league}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </ Container>
    );
}

export default PlayerTrophies