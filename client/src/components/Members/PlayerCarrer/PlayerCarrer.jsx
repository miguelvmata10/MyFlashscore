import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { fetchPlayerTransfers } from '../../../services/PeopleService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest';
import NotFound from '../../CommonUI/NotFound';
import FallbackImage from '../../CommonUI/FallbackImage';

const PlayerCarrer = () => {
    const { playerID } = useParams();
    const [transfers, setTransfers] = useState([]);
    const { data: playerTransfers, loading, error, fetchData } = useApiRequest(fetchPlayerTransfers);

    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }
    }, [playerID, fetchData]);

    useEffect(() => {
        if (playerTransfers && playerTransfers.length > 0) {
            setTransfers(playerTransfers[0].transfers);
        }
    }, [playerTransfers]);

    
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTransfers || playerTransfers.length === 0 ) return <NotFound />;
    
    return transfers.length > 0 ? (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Table striped hover responsive variant="dark" className='text-center'>
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
                                <FallbackImage className="imageResize me-2" type='team' src={transfer.teams.out.logo} />
                                <Link to={`/team/${transfer.teams.out.id}`} className="customLink ms-1">
                                    {transfer.teams.out.name}
                                </Link>
                            </td>
                            <td>
                                <FallbackImage className="imageResize me-2" type='team' src={transfer.teams.in.logo} />
                                <Link to={`/team/${transfer.teams.in.id}`} className="customLink ms-1">
                                    {transfer.teams.in.name}
                                </Link>
                            </td>
                            <td><b>{transfer.type}</b></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    ) : <h3><b>Sem registo de transferências</b></h3>;
}
export default PlayerCarrer