import { Row, Col, Badge, Container } from 'react-bootstrap';
import default_player_logo from '../../assets/FallbackImages/default_player_logo.png';
import { Link } from 'react-router-dom';
import { formatBadge } from '../../utils/helpers';

const PlayersList = ({ teamData, type, title }) => {
  return (
    <>
      <div className='d-flex justify-content-center rounded-3 p-2 mb-3 mt-3' style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
        <span>{title}</span>
      </div>
      <Row className='mb-3'>
        <Col className='text-start'>
          {teamData[0][`${type}`].map((player, index) => (
            <p key={index} className='align-items-center'>
              {player.number}
              <Link to={`/player/${player.id}`} className='customLink'>
                <span className="ms-1 me-2">
                  {player.name}
                  {player.pos === 'G' ? <b> (GR) </b> : ''}
                  {player.captain ? <b> (C) </b> : ''}
                </span>
              </Link>
              {player.rating !== 'N/A' ? <Badge pill bg={formatBadge(player.rating)}>
                {player.rating}
              </Badge> : ""}
            </p>
          ))}
        </Col>
        <Col className='text-end'>
          {teamData[1][`${type}`].map((player, index) => (
            <p key={index} className="align-items-center">
              <Link to={`/player/${player.id}`} className='customLink'>
                  {player.name}
                  {player.pos === 'G' ? <b> (GR) </b> : ''}
                  {player.captain ? <b> (C) </b> : ''}
              </Link>
              <span className="ms-2 me-1">
                {player.number}
              </span>
              {player.rating !== 'N/A' ? 
                <Badge pill bg={formatBadge(player.rating)}>
                  {player.rating}
                </Badge> 
              : ""}
            </p>
          ))}
        </Col>
      </Row>
    </>
  );
};

const GameLineups = ({ lineups, players }) => {

  const mergedData = lineups.map(team => {
    const mergeData = ( playerList ) => {

      if (!playerList || !Array.isArray(playerList)) return []; // Garante que playerList é um array válido
      
      return playerList.map(({ player }) => {
        const playerData = players
          .flatMap(p => p.players)
          .find(p => p.player.id === player.id) || {};

          return {
            id: player.id,
            name: player.name,
            number: player.number,
            grid: player.grid,
            pos: player.pos,
            photo: playerData.player?.photo || default_player_logo,
            captain: playerData.statistics?.[0]?.games?.captain || false,
            rating: playerData.statistics?.[0]?.games?.rating 
                      ? parseFloat(playerData.statistics?.[0]?.games?.rating).toFixed(1) // para ter uma casa decimal (7 -> 7.0) 
                      : 'N/A',
            substitute: playerData.statistics?.[0]?.games?.substitute || null
          };
      }); 
    };

    return {
      team: {
        teamID: team.team.id,
        teamName: team.team.name,
      },
      teamFormation: team.formation,
      startXI: mergeData(team.startXI),
      substitutes: mergeData(team.substitutes),
    };
  });

  console.log('mergedData:', mergedData);

  return (
    <Container fluid>
      {mergedData.length === 0 ? (
        <div className="text-center p-4 fw-bold rounded-4" style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
          Nenhum evento disponível
        </div>
      ) : (
        <div>
          <div className='d-flex justify-content-between align-items-center mb-1 rounded-3 p-2 mb-2' style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
            <span className='fw-bold'>{mergedData[0].teamFormation}</span>
            <h6 className='m-0 text-center'>Formações</h6>
            <span className='fw-bold'>{mergedData[1].teamFormation}</span>
          </div>
          {/* <TacticalFormationDisplay homeTeamData={mergedData[0]} awayTeamData={mergedData[1]} /> */}
          <PlayersList teamData={mergedData} type='startXI' title='Equipa inicial' />
          <PlayersList teamData={mergedData} type='substitutes' title='Suplentes' />
        </div>
        
      )}
    </Container>
  )
}

export default GameLineups