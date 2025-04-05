import FootballField from '../../../assets/GameImages/FootballField.png'
import FallbackImage from '../../CommonUI/FallbackImage';
import '../GameStyles.css';
import LineupsRenderer from './LineupsRenderer';

const TeamsLineupDisplay = ({ homeTeamData, awayTeamData }) => {
    const lineups = [
        ...LineupsRenderer({ teamData: homeTeamData, isHomeTeam: true }),
        ...LineupsRenderer({ teamData: awayTeamData, isHomeTeam: false })
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