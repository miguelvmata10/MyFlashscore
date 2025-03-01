import React, { useEffect } from 'react';
import { Table, Image } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { fetchPlayerTransfers, fetchPlayerTrophies } from '../../services/PeopleService';
import useApiRequest from '../../hooks/useApiRequest';

export const PlayerCarrer = () => {
    const { playerID } = useParams();
    const { data: playerTransfers, loading, error, fetchData } = useApiRequest(fetchPlayerTransfers);

    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
    }, [playerID, fetchData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTransfers) return <p>Nenhum dado disponível.</p>;

    const transfers = playerTransfers[0].transfers;

    return (
        <Table striped hover responsive variant="dark">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>De</th>
                    <th>Para</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
            {transfers.map((transfer, index) => (
                <tr key={index}>
                    <td>{transfer.date}</td>
                    <td>
                        <Image className="imageResize me-2" src={transfer.teams.out.logo}/>
                        <Link to={`/team/${transfer.teams.out.id}`} className="customLink ms-1">{transfer.teams.out.name}</Link>
                    </td>
                    <td>
                        <Image className="imageResize me-2" src={transfer.teams.in.logo}/>
                        <Link to={`/team/${transfer.teams.in.id}`} className="customLink ms-1">{transfer.teams.in.name}</Link>
                    </td>
                    <td>{transfer.type}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export const PlayerTrophies = () => {
    const { playerID } = useParams();
    const { data: playerTrophies, loading, error, fetchData } = useApiRequest(fetchPlayerTrophies);
  
    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
    }, [playerID, fetchData]);
  
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTrophies) return <p>Nenhum dado disponível.</p>;
  
    // necessário filtrar apenas os troféus ganhos, pois a API retorna campeonatos ganhos e vice-campeonatos
    const filteredPlayerTrophies = playerTrophies.filter(trophy => trophy.place === 'Winner');
  
    return (
        <>
            <h2 className='mb-3'><b>{filteredPlayerTrophies.length} troféus ganhos</b></h2>

            {filteredPlayerTrophies.length > 0 && (
                <Table striped hover responsive variant="dark">
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
            )}
        </>
    );
  }
