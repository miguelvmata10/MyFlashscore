import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import GenericStatsTable from '../GenericStatsTable';
import GamesModal from './SquadGamesStatistics/GamesModal';
import GoalsModal from './SquadGoalsStatistics/GoalsModal';

const SquadGameGoalStats = ({ statistics }) => {
    const [ showGamesModal, setShowGamesModal ] = useState(false);
    const [ showGoalsModal, setShowGoalsModal ] = useState(false);

    const handleShowModal = ( modalType ) => {
        modalType === 'games' ? setShowGamesModal(true) : setShowGoalsModal(true);
    }

    const handleCloseModal = ( modalType ) => {
        modalType === 'games' ? setShowGamesModal(false) : setShowGoalsModal(false);
    }

    return (
        <Row>
            {['games', 'goals'].map((type) => {
            const title = type === 'games' ? 'Games' : 'Goals';
            const textPosition = type === 'games' ? 'start' : 'end';
            const showTypeModal = type === 'games' ? showGamesModal : showGoalsModal;

            return (
                <Col key={type}>
                <h6 className="text-center">{title}</h6>
                <GenericStatsTable statistics={statistics} typeOfTable={type} />
                <div className={`text-${textPosition} mb-2`}>
                    <Button variant="outline-secondary" size="sm" onClick={() => handleShowModal(type)}>
                        Ver mais
                    </Button>
                </div>
                {type === 'games' ? (
                    <GamesModal show={showTypeModal} statistics={statistics} onClose={() => handleCloseModal(type)} />
                    ) : (
                    <GoalsModal show={showTypeModal} statistics={statistics} onClose={() => handleCloseModal(type)} />
                    ) 
                }
                </Col>
            );
            })}
        </Row>
    );
}
export default SquadGameGoalStats