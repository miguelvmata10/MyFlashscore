import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../GameStyles.css'
import FallbackImage from '../../CommonUI/FallbackImage';
import { formatGameDate } from '../../../utils/helpers';

const TeamDisplay = ({ team }) => {
    return (
        <Col xs={4} className="text-center">
            <div className="bg-white rounded-4 d-inline-flex justify-content-center align-items-center p-2" 
                style={{ width: '100%', height: '100%', maxWidth: '90px', maxHeight: '100px', aspectRatio: '1/1' }}>
                <FallbackImage 
                    src={team.logo} 
                    type='team' 
                    fluid 
                    className="mx-auto" 
                    style={{ maxWidth: '90%', maxHeight: '90%' }} 
                />
            </div>
            <Link to={`/team/${team.id}`} className='customLink'>
                <h5 className="mt-3 ">{team.name}</h5>
            </Link>
        </Col>
    );
};

const ScoreDisplay = ({ fixture, score }) => {
    return (
        <Col xs={4} className="text-center px-0">
            <span className='text-secondary'>{formatGameDate(fixture.date)}</span>
            <h1 className="my-1 text-danger fw-bold">
                {score.fulltime.home} - {score.fulltime.away}
            </h1>
            <h6 className="text-danger fw-bold small">{fixture.status.short}</h6>
        </Col>
    );
};

const GameHeader = ({ homeTeam, awayTeam, fixture, score }) => {
    return (
      <Row className="align-items-start justify-content-center py-3">
        <TeamDisplay team={homeTeam} />
        <ScoreDisplay fixture={fixture} score={score} />
        <TeamDisplay team={awayTeam} />
      </Row>
    );
};

export default GameHeader