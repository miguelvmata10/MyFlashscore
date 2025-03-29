import { Row, Col } from 'react-bootstrap';
import '../GameStyles.css';
import FallbackImage from '../../CommonUI/FallbackImage';

const GameCardStandardLayout = ({GameData, renderGameStatus}) => {
    return (
        <Row>
            <Col className='text-end'>
                <span className='me-1'>{GameData?.teams?.home?.name ?? 'Unknown'}</span>
                <FallbackImage type='team' src={GameData?.teams?.home?.logo} className='imageResize'/>
            </Col>

            <Col className="text-center">
                {renderGameStatus()}
            </Col>

            <Col className='text-start'>
                <FallbackImage type='team' src={GameData?.teams?.away?.logo} className='imageResize'/>
                <span className='ms-1'>{GameData?.teams?.away?.name ?? 'Unknown'}</span>
            </Col>
        </Row>
    );
}
export default GameCardStandardLayout