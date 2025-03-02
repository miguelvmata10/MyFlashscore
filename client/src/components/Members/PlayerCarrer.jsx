import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Table, Card  } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { fetchPlayerTransfers, fetchPlayerTrophies } from '../../services/PeopleService';
import useApiRequest from '../../hooks/useApiRequest';

export const PlayerCarrer = () => {
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

    
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTransfers) return <p>Nenhum dado disponível.</p>;
    
    return transfers.length > 0 ? (
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
                            <Image className="imageResize me-2" src={transfer.teams.out.logo} />
                            <Link to={`/team/${transfer.teams.out.id}`} className="customLink ms-1">
                                {transfer.teams.out.name}
                            </Link>
                        </td>
                        <td>
                            <Image className="imageResize me-2" src={transfer.teams.in.logo} />
                            <Link to={`/team/${transfer.teams.in.id}`} className="customLink ms-1">
                                {transfer.teams.in.name}
                            </Link>
                        </td>
                        <td>{transfer.type}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    ) : <h3><b>Sem registo de transferências</b></h3>;
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
        <Container fluid className="container rounded-4">
            <h3 className='mb-3'><b>{filteredPlayerTrophies.length} troféus ganhos</b></h3>

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
        </ Container>
    );
}

export const PlayerDetails = ({details}) => {
    const translateToPortuguese = (position) => {
        switch (position) {
            case 'Goalkeeper':
                return 'Guarda-redes';
            case 'Defender':
                return 'Defesa';
            case 'Midfielder':
                return 'Médio';
            case 'Attacker':
                return 'Avançado';
            default:
                return 'N/A';
        }
    }

    return (
        <Container fluid className="p-0 container rounded-4">
            <Card className="bg-transparent text-white border-0 rounded-0">
                <Card.Body className="py-4 px-4">
                <Row className="mb-4">
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className="fw-bold mb-0">{details.player.age}</h3>
                            <small className="text-white-50">Idade</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{translateToPortuguese(details.player.position)}</h3>
                            <small className="text-white-50">Posição</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.nationality}</h3>
                            <small className="text-white-50">País</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.birth.place}</h3>
                            <small className="text-white-50">Cidade</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.height}</h3>
                            <small className="text-white-50">Altura</small>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.weight}</h3>
                            <small className="text-white-50">Peso</small>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} lg={2}>
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.number}</h3>
                            <small className="text-white-50">Camisola nº</small>
                        </div>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
