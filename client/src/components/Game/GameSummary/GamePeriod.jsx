import { Row } from 'react-bootstrap';
import GameEvent from './GameEvent';

const GamePeriod = ({ period, events, homeTeam }) => {
    return (
        <div>
        <h6 className="mb-0 fw-bold rounded-3 p-2" style={{ backgroundColor: '#4e4e4b' }}>
            {period}
        </h6>
        <div className="p-3">
            {events.map((event, index) => (
            <Row key={index} className="mb-3">
                <GameEvent event={event} isHomeTeam={event.team.id === homeTeam} />
            </Row>
            ))}
        </div>
        </div>
    )
}
export default GamePeriod