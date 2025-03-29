import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatBadge } from '../../../utils/helpers';
import FootballField from '../../../assets/GameImages/FootballField.png'
import FallbackImage from '../../CommonUI/FallbackImage';
import '../GameStyles.css';

const PlayerLineupCard = ({ player }) => {
    const MAX_NAME_LENGTH = 8;

    const truncateName = (name) => {
        return `${name.slice(0, MAX_NAME_LENGTH)}...`; 
    };

    return (
      <div className='text-white'>
        <div className='d-flex justify-content-center'>
            <FallbackImage 
                src={player.photo}
                type='player'
                className='rounded-5 player-image'
                style={{ maxWidth: '45px', maxHeight: '45px' }}
            />
        </div>
        <div>
            <div className='fw-bold'>
                <Badge bg='dark' className='player-badge'>
                    <span className='me-1'>{player.number}</span>
                    {player.name.length > MAX_NAME_LENGTH ? (
                        <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip id="button-tooltip-2">{player.name}</Tooltip>}
                        >
                            <Link to={`/player/${player.id}`} className='customLink'>
                                {truncateName(player.name)}
                            </Link>
                        </OverlayTrigger>
                        ) : (
                            <Link to={`/player/${player.id}`} className='customLink'>
                                {player.name}
                            </Link>
                    )}
                </Badge>
            </div>
          {player.rating !== 'N/A' ? <Badge bg={formatBadge(player.rating)} className='player-badge'>
            {player.rating}
          </Badge> : ""}
        </div>
      </div>
    );
}

// Agrupa os jogadores por row e ordena-os pela posição horizontal
const formatTeamFormation = (teamData) => {
    const playersByRow = {};

    teamData.forEach(player => {
        const [row, column] = player.grid.split(":").map(Number);

        if (!playersByRow[row]) {
            playersByRow[row] = [];
        }
        
        playersByRow[row].push({ ...player, position: column });
    });

    console.log('PLAYERS PER ROW: ', playersByRow);
    return playersByRow;
};

const renderHomeTeamLineup = ({ homeTeamData }) => {
    
    const homeFormationLength = homeTeamData.teamFormation.split("-").length + 1;
    const homeRowSize = 50 / homeFormationLength;
    const homeTeamLineup = formatTeamFormation(homeTeamData.startXI);
    
    const homeTeam = [];

    // Posiciona os jogadores da equipa da casa na metade superior do campo
    Object.entries(homeTeamLineup).forEach(([row, players]) => {
        const rowIndex = parseInt(row);
        // A posição vertical será colocada na metade da row 
        const topPoint = (rowIndex - 1) * homeRowSize + (homeRowSize / 2);
        // Define o espaço horizontal entre os jogadores dessa linha
        const spaceBetweenPlayers = 100 / (players.length + 1);
        
        players.forEach(player => {
        // Calcula a posição horizontal (left) conforme a posição do jogador na linha
        const leftPoint = 100 - (player.position * spaceBetweenPlayers);
        homeTeam.push(
            <div key={`home-${player.id}`}
                style={{
                    position: 'absolute',
                    top: `${topPoint}%`,
                    left: `${leftPoint}%`,
                    transform: 'translate(-50%, -50%)',
                }}
                className='text-center'
            >
                <PlayerLineupCard player={player} />
            </div>
        );
        });
    });

    return homeTeam;
}

const renderAwayTeamLineup = ({ awayTeamData }) => {
    
    const awayFormationLength = awayTeamData.teamFormation.split("-").length + 1;
    const awayRowSize = 50 / awayFormationLength;
    const awayTeamLineup = formatTeamFormation(awayTeamData.startXI);

    const awayTeam = [];

    // Posiciona os jogadores da equipa visitante na metade inferior do campo
    Object.entries(awayTeamLineup).forEach(([row, players]) => {
        const rowIndex = parseInt(row);
        // Inverte a posição (começando de baixo para cima)
        const topPoint = 100 - ((rowIndex - 1) * awayRowSize + (awayRowSize / 2));
        const spaceBetweenPlayers = 100 / (players.length + 1);
        
        players.forEach(player => {
        const leftPoint = player.position * spaceBetweenPlayers;
        awayTeam.push(
            <div key={`away-${player.id}`}
                style={{
                    position: 'absolute',
                    top: `${topPoint}%`,
                    left: `${leftPoint}%`,
                    transform: 'translate(-50%, -50%)',
                }}
                className='d-flex justify-content-center align-items-center text-center'
            >
            <PlayerLineupCard player={player} />
            </div>
        );
        });
    });

    return awayTeam;
}

const TeamsLineupDisplay = ({ homeTeamData, awayTeamData }) => {
    const lineups = [
        ...renderHomeTeamLineup({ homeTeamData }),
        ...renderAwayTeamLineup({ awayTeamData })
    ];

    return (
        <div className='mb-4 overflow-auto' style={{ position: 'relative' }}>
            <FallbackImage
                src={FootballField}
                className="d-block mx-auto"
                style={{ width: '80%', height: 'auto' }}
            />
                {lineups}
        </div>
    );
}

export default TeamsLineupDisplay;