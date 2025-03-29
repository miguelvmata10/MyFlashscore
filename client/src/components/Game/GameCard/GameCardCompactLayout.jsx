import { Row, Col } from 'react-bootstrap';
import '../GameStyles.css';
import FallbackImage from '../../CommonUI/FallbackImage';

const GameCardCompactLayout = ({inPlayOrFinishedStatuses, GameData, gameStatus, renderGameStatus}) => {

    const getGameScore = () => {
        if (inPlayOrFinishedStatuses.includes(gameStatus) && GameData?.goals) {
          return {
              home: GameData.goals.home ?? '-',
              away: GameData.goals.away ?? '-'
          };
        }
        return null;
    }

    const score = getGameScore();
  
    return (
      <Row>
        <Col xs="auto" className="d-flex align-items-center">
          <div className="d-flex flex-column justify-content-center">
            {renderGameStatus()}
          </div>
        </Col>
        <Col>
        
          <div className="d-flex align-items-center mb-1">
            <div className="d-flex align-items-center flex-grow-1">
              <FallbackImage type='team' src={GameData?.teams?.home?.logo} className='imageResize me-2'/>
              <span className='small'>{GameData?.teams?.home?.name ?? 'Unknown'}</span>
            </div>
            {score && <span className="ms-auto fw-bold">{score.home}</span>}
          </div>

          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center flex-grow-1">
              <FallbackImage type='team' src={GameData?.teams?.away?.logo} className='imageResize me-2'/>
              <span className='small'>{GameData?.teams?.away?.name ?? 'Unknown'}</span>
            </div>
            {score && <span className="ms-auto fw-bold">{score.away}</span>}
          </div>
        </Col>
      </Row>
    );
};
export default GameCardCompactLayout