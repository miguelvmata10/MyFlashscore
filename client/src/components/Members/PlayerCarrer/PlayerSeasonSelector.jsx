import React, { useEffect, useState } from 'react';
import { Container, Row, Dropdown } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { fetchPlayerSeasons } from '../../../services/PeopleService';
import LoadingScreen from '../../CommonUI/LoadingScreen';
import useApiRequest from '../../../hooks/useApiRequest'; 
import NotFound from '../../CommonUI/NotFound';
import PlayerStatistics from './PlayerStatistics';

const PlayerSeasonSelector = () => {
    const { playerID } = useParams();
    const [ selectedSeason, setSelectedSeason ] = useState(null);
    const { data: playerSeasons, loading, error, fetchData } = useApiRequest(fetchPlayerSeasons);
  
    useEffect(() => {
        if (playerID) {
            fetchData(playerID);
        }

    }, [playerID, fetchData]);

    const decreasingOrdering = (seasonsArray) => {
        if (seasonsArray && Array.isArray(seasonsArray)) {  
            return seasonsArray.sort((a, b) => b - a);
        }
        return [];  
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

export default PlayerSeasonSelector