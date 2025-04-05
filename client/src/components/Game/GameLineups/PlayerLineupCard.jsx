import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatBadge } from '../../../utils/helpers';
import FallbackImage from '../../CommonUI/FallbackImage';
import '../GameStyles.css';

const PlayerLineupCard = ({ player }) => {
    const MAX_NAME_LENGTH = 8;

    const truncateName = (name) => {
        return `${name.slice(0, MAX_NAME_LENGTH)}...`; 
    };

    return (
      <div className='text-white'>
        <div className='d-flex justify-content-center mb-2' style={{ position: 'relative' }}>
            <div>
                <FallbackImage 
                    src={player.photo}
                    type='player'
                    className='rounded-5 player-image'
                    style={{ maxWidth: '45px', maxHeight: '45px' }}
                />
            </div>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '-10px'}} >
                {player.rating !== 'N/A' ? <Badge bg={formatBadge(player.rating)} className='player-badge'>
                    {player.rating}
                </Badge> : ""}
            </div>
        </div>
        <div>
            <div className='fw-bold'>
                <Badge bg='dark' className='player-badge'>
                    <span className='me-1'>{player.number}</span>
                    {player.name.length > MAX_NAME_LENGTH ? (
                        <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>{player.name}</Tooltip>}
                        >
                            <Link to={`/player/${player.id}`} className='customLink'>
                                <span>{truncateName(player.name)}</span>
                            </Link>
                        </OverlayTrigger>
                        ) : (
                            <Link to={`/player/${player.id}`} className='customLink'>
                                <span>{player.name}</span>
                            </Link>
                    )}
                </Badge>
            </div>
        </div>
      </div>
    );
}

export default PlayerLineupCard