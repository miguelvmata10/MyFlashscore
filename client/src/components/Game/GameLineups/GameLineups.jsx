import { Container } from 'react-bootstrap';
import default_player_logo from '../../../assets/FallbackImages/default_player_logo.png';
import TeamsLineupDisplay from './TeamsLineupDisplay';
import NotFound from '../../CommonUI/NotFound';
import PlayerListLineup from './PlayerListLineup';

const GameLineups = ({ lineups, players }) => {

  const mergedData = lineups.map(team => {
    const mergeData = ( playerList ) => {
      if (!playerList || !Array.isArray(playerList)) return []; // Garante que playerList é um array válido
      
      return playerList.map(({ player }) => {
        const playerData = players
          .flatMap(p => p.players)
          .find(p => p.player.id === player.id) || {};

          return {
            id: player?.id || '',
            name: player?.name || 'Unknown',
            number: player?.number || '',
            grid: player?.grid || '',
            pos: player?.pos || '',
            photo: playerData?.player?.photo || default_player_logo,
            captain: playerData?.statistics?.[0]?.games?.captain || false,
            rating: playerData?.statistics?.[0]?.games?.rating 
                      ? parseFloat(playerData.statistics?.[0]?.games?.rating).toFixed(1) // para ter uma casa decimal (7 -> 7.0) 
                      : 'N/A',
            substitute: playerData.statistics?.[0]?.games?.substitute || null
          };
      }); 
    };

    return {
      team: {
        teamID: team?.team?.id || '',
        teamName: team?.team?.name || 'Unknown',
      },
      teamFormation: team?.formation || '',
      startXI: mergeData(team?.startXI),
      substitutes: mergeData(team?.substitutes),
    };
  });
  
  // só poderei mostrar o 11 inicial de forma gráfica (TeamsLineupDisplay) se tiver a
  // formação tática da equipa e se tiver o grid e posição de todos os jogadores dos 11's 
  // iniciais de ambas as equipas 
  const isValidData = mergedData.every(teamData => {
    const hasTeamFormation = teamData.teamFormation && teamData.teamFormation !== null;
    const hasValidPlayers = teamData.startXI.length > 0 && teamData.startXI.every(player => player.pos && player.grid);

    return hasTeamFormation && hasValidPlayers;
  });

  return (
    <Container fluid>
      {mergedData.length === 0 ? (
        <NotFound />
      ) : (
        <div>
          {isValidData &&
            <>
              <div className='d-flex justify-content-between align-items-center mb-1 rounded-3 p-2 mb-2' style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
                <span className='fw-bold'>{mergedData[0].teamFormation}</span>
                <h6 className='m-0 text-center'>Lineups</h6>
                <span className='fw-bold'>{mergedData[1].teamFormation}</span>
              </div>
              <TeamsLineupDisplay homeTeamData={mergedData[0]} awayTeamData={mergedData[1]} />
            </>
          }
          <PlayerListLineup teamData={mergedData} type='startXI' title='Starting lineups' />
          <PlayerListLineup teamData={mergedData} type='substitutes' title='Substitutes' />
        </div>
        
      )}
    </Container>
  )
}

export default GameLineups