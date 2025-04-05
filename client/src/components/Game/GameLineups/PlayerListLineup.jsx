import React from 'react';
import { Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatBadge } from '../../../utils/helpers';

const PlayerItem = ({ player, isRightAligned }) => {
  const { id, name, number, pos, captain, rating } = player;
  
  return (
    <p className="align-items-center">
      {!isRightAligned && number}
      
      <Link to={`/player/${id}`} className="customLink">
        <span className={isRightAligned ? '' : 'ms-1 me-2'}>
          {name}
          {pos === 'G' && <b> (GR) </b>}
          {captain && <b> (C) </b>}
        </span>
      </Link>
      
      {isRightAligned && <span className="ms-2 me-1">{number}</span>}
      
      {rating !== 'N/A' && (
        <Badge pill bg={formatBadge(rating)}>
          {rating}
        </Badge>
      )}
    </p>
  );
};

const PlayerListLineup = ({ teamData, type, title }) => {
  if (!teamData || teamData.length < 2 || !teamData[0][type] || !teamData[1][type]) {
    return <div>Dados indisponíveis</div>;
  }

  const leftTeamPlayers = teamData[0][type];
  const rightTeamPlayers = teamData[1][type];

  return (
    <>
      <div 
        className="d-flex justify-content-center rounded-3 p-2 mb-3 mt-3" 
        style={{ backgroundColor: '#4e4e4b', color: 'white' }}
      >
        <span>{title}</span>
      </div>
      
      <Row className="mb-3">
        <Col className="text-start">
          {leftTeamPlayers.map((player, index) => (
            <PlayerItem 
              key={`left-${player.id || index}`} 
              player={player} 
              isRightAligned={false} 
            />
          ))}
        </Col>
        
        <Col className="text-end">
          {rightTeamPlayers.map((player, index) => (
            <PlayerItem 
              key={`right-${player.id || index}`} 
              player={player} 
              isRightAligned={true} 
            />
          ))}
        </Col>
      </Row>
    </>
  );
};

export default PlayerListLineup;