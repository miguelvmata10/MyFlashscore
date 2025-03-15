import React, { useEffect, useState } from 'react';
import { Container, Image, Row, Col, Table, Card, Accordion, Dropdown } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { fetchPlayerTransfers, fetchPlayerTrophies, fetchPlayerSeasons, fetchPlayerStatistics} from '../../services/PeopleService';
import ElementCard from '../CommonUI/ElementCard';
import LoadingScreen from '../CommonUI/LoadingScreen';
import useApiRequest from '../../hooks/useApiRequest'; 
import NotFound from '../CommonUI/NotFound';

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

    
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTransfers || playerTransfers.length === 0 ) return <NotFound />;
    
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
                        <td><b>{transfer.type}</b></td>
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
  
    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerTrophies || playerTrophies.length === 0 ) return <NotFound />;
  
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

export const PlayerSeasonSelector = () => {
    const { playerID } = useParams();
    const [ selectedSeason, setSelectedSeason ] = useState(null);
    const { data: playerSeasons, loading, error, fetchData } = useApiRequest(fetchPlayerSeasons);
  
    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }

    }, [playerID, fetchData]);

    const decreasingOrdering = (seasonsArray) => {
        if (seasonsArray && Array.isArray(seasonsArray)) {  // Verifica se é um array válido
            return seasonsArray.sort((a, b) => b - a);
        }
        return [];  // Retorna um array vazio se playerSeasons for inválido
    }
    
    const seasonsOrdered = decreasingOrdering(playerSeasons);

    useEffect(() => {
        if (seasonsOrdered.length > 0 && selectedSeason === null) {
            setSelectedSeason(seasonsOrdered[0]);
        }
    }, [seasonsOrdered, selectedSeason]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerSeasons || playerSeasons.length === 0 ) return <NotFound />;

    const handleDropdownSelect = (eventKey) => {
        setSelectedSeason(eventKey);
    }

    return (
        <Container>
            <Row>
                <Dropdown onSelect={handleDropdownSelect}>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic" className='mb-3'>
                        {selectedSeason ? (
                            <>
                                {selectedSeason}
                            </>
                        ) : (
                            "Selecione uma época"
                        )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="bg-dark text-white" style={{ maxHeight: "300px" }}>
                        {seasonsOrdered.map((season) => (
                            <Dropdown.Item key={season} eventKey={season} className="bg-dark text-white">
                                {season}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row>
                <PlayerStatistics season={selectedSeason}/>
            </Row>
        </Container>
    );
};

export const PlayerStatistics = ({season}) => {
    const { playerID } = useParams();
    const { data: playerStatistics, loading, error, fetchData } = useApiRequest(fetchPlayerStatistics);
    const [ uniqueClubs, setUniqueClubs ] = useState({});
  
    useEffect(() => {
        if (playerID && season) {
            fetchData(playerID, season);
        }

    }, [playerID, season, fetchData]);

    useEffect(() => {
        if (!playerStatistics || playerStatistics.length === 0) return; 
            const stats = playerStatistics[0].statistics;
            const uniqueClubs = {};
            
            stats.forEach(({team}) => {
                if (!uniqueClubs[team.id]) {
                    uniqueClubs[team.id] = {
                        id: team.id,
                        name: team.name,
                        logo: team.logo
                    }
                }
            });

            setUniqueClubs(uniqueClubs);
        
    }, [playerStatistics]);

    if (loading) return <LoadingScreen />;
    if (error) return <p>Erro: {error.message}</p>;
    if (!playerStatistics || playerStatistics.length === 0) return <NotFound />;
    
    const stats = playerStatistics[0].statistics;
    
    return (
        <Container>
            {/* Clubes onde o jogador jogou na época */}
            <Row>
                {Object.values(uniqueClubs).map((club) => (
                    <Col>
                        <ElementCard 
                            role='team'
                            id={club.id}
                            photo={club.logo}
                            name={club.name}
                            key={club.id}
                        />
                    </Col>
                ))}
            </Row>
            
            {/* Estatísticas por liga */}
            <Accordion>
                {stats.map((stat, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index} className='bg-transparent'>
                        <Accordion.Header>
                            <Image src={stat.league.logo} className="me-2 imageResize" />
                            {stat.league.name} ({stat.league.season})
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover responsive variant="dark">
                                <thead>
                                    <tr>
                                        <th>Jogos</th>
                                        <th>Minutos</th>
                                        <th>Gols</th>
                                        <th>Assistências</th>
                                        <th>Cartões Amarelos</th>
                                        <th>Cartões Vermelhos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{stat.games.appearences}</td>
                                        <td>{stat.games.minutes}</td>
                                        <td>{stat.goals.total}</td>
                                        <td>{stat.goals.assists}</td>
                                        <td>{stat.cards.yellow}</td>
                                        <td>{stat.cards.red}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container> 
    )
}



