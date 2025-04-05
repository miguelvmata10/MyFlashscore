import '../GameStyles.css';
import PlayerLineupCard from './PlayerLineupCard';

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

    return playersByRow;
};

const LineupsRenderer = ({ teamData, isHomeTeam }) => {
    const formationLength = teamData.teamFormation.split("-").length + 1;
    const rowSize = 50 / formationLength;
    const teamLineup = formatTeamFormation(teamData.startXI);
    
    const team = [];

    Object.entries(teamLineup).forEach(([row, players]) => {
        const rowIndex = parseInt(row);
        
        // Determina a posição vertical com base na equipa (casa ou visitante)
        let topPoint;
        if (isHomeTeam) {
            // Equipa da casa na metade superior
            topPoint = (rowIndex - 1) * rowSize + (rowSize / 2);
        } else {
            // Equipa de fora na metade inferior (invertida)
            topPoint = 100 - ((rowIndex - 1) * rowSize + (rowSize / 2));
        }
        
        const spaceBetweenPlayers = 100 / (players.length + 1);
        
        players.forEach(player => {
            // Determina a posição horizontal com base na equipa
            let leftPoint;
            if (isHomeTeam) {
                leftPoint = 100 - (player.position * spaceBetweenPlayers);
            } else {
                leftPoint = player.position * spaceBetweenPlayers;
            }
            
            team.push(
                <div key={`${isHomeTeam ? 'home' : 'away'}-${player.id}`}
                    style={{
                        position: 'absolute',
                        top: `${topPoint}%`,
                        left: `${leftPoint}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    className={`text-center ${!isHomeTeam ? 'd-flex justify-content-center align-items-center' : ''}`}
                >
                    <PlayerLineupCard player={player} />
                </div>
            );
        });
    });

    return team;
}

export default LineupsRenderer