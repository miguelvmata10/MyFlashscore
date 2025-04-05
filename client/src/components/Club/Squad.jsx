import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ElementCard from '../CommonUI/ElementCard';
import { fetchSquadInfo } from '../../services/TeamsService';
import useApiRequest from '../../hooks/api/useApiRequest';
import LoadingScreen from '../CommonUI/LoadingScreen';
import NotFound from '../CommonUI/NotFound';
import ErrorBanner from '../CommonUI/ErrorBanner';

const Squad = ({teamID}) => {
    const { data: teamData, loading: teamloading, error: teamError, fetchData: fetchTeamData } = useApiRequest(fetchSquadInfo);

    useEffect(() => {
        if (teamID) {
            fetchTeamData(teamID);
        }
    }, [teamID, fetchTeamData]);

    if (teamloading) return <LoadingScreen />;
    if (teamError) return <ErrorBanner errorMessage={teamError.message} />;
    if (!teamData || teamData.length === 0) return <NotFound />;

    // Verifica se squad e squad[0] existem antes de tentar acessar players
    const players = teamData && teamData[0] ? teamData[0].players : [];

    const goalkeepers = players.filter(player => player.position === 'Goalkeeper');
    const defenders = players.filter(player => player.position === 'Defender');
    const midfielders = players.filter(player => player.position === 'Midfielder');
    const forwards = players.filter(player => player.position === 'Attacker');

    return (
        <>
            <h4 className='heading-border'>Goalkeepers</h4>
            <Row className='g-1'>
                {goalkeepers.map((player, index) => (
                    <Col md={6} key={index}>
                        <ElementCard 
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                        />
                    </Col>
                ))}
            </Row>
            <h4 className='heading-border'>Defenders</h4>
            <Row className='g-1'>
                {defenders.map((player, index) => (
                    <Col md={6} key={index}>
                        <ElementCard
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                        />
                    </Col>
                ))}
            </Row>
    
            <h4 className='heading-border'>Midfielders</h4>
            <Row className='g-1'>
                {midfielders.map((player, index) => (
                    <Col md={6} key={index}>
                        <ElementCard
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                        />
                    </Col>
                ))}
            </Row>
    
            <h4 className='heading-border'>Attackers</h4>
            <Row className='g-1'>
                {forwards.map((player, index) => (
                    <Col md={6} key={index}>
                        <ElementCard
                            role='player'
                            id={player.id}
                            photo={player.photo}
                            name={player.name}
                            number={player.number}
                            age={player.age}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
}
export default Squad