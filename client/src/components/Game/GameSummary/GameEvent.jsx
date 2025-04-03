import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EventImage from './EventImage';

const formatTime = (elapsed, extra) => {
    return extra ? `${elapsed}+${extra}' ` : `${elapsed}' `;
};

const PlayerLink = ({ id, name }) => {
    return <Link to={`/player/${id}`} className="customLink">{name}</Link>
}

const AssistLink = ({ id, name, className}) => {
    return name ? (
        <Link to={`/player/${id}`} className='customLink'>
            <span className={className} style={{ color: '#a1a19a' }}>({name})</span>
        </Link>
    ) : null;
}

const GameEvent = ({ event, isHomeTeam }) => {
    const className = isHomeTeam ? "text-start" : "text-end";
    const assistSpanClassName = isHomeTeam ? "ms-1" : "me-1";
    
    const elements = [
        <AssistLink key="assist" id={event.assist?.id} name={event.assist?.name} className={assistSpanClassName} />,
        <PlayerLink key="player" id={event.player.id} name={event.player.name} />,
        <OverlayTrigger key="overlay" placement="top" overlay={<Tooltip>{event.detail}</Tooltip>}>
            <span>
                <EventImage event={event} />
            </span>
        </OverlayTrigger>,
        <span key="time">{formatTime(event.time.elapsed, event.time.extra)}</span> 
    ]

    return (
        <div className={`${className} gap-2`}>
            {isHomeTeam ? [...elements].reverse() : elements}
        </div>
    )
}
export default GameEvent