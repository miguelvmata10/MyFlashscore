import GenericModal from '../../../../CommonUI/GenericModal';
import { Row, ButtonGroup, Button, Container } from 'react-bootstrap';
import useButtonGroup from '../../../../../hooks/ui/useButtonGroup';
import PointsPerGameOverview from './PointsPerGameOverview';
import LineupsStats from './LineupsStats';
import CardsStats from './CardsStats';

const GamesModal = ({ show, onClose, statistics }) => {
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('lineups');

  const renderComponent = () => {
    switch (selected) {
        case 'lineups':
            return <LineupsStats lineups={statistics.lineups}/>;
        case 'ppg':
            return <PointsPerGameOverview fixtures={statistics.fixtures} />;
        case 'cards':
            return <CardsStats cards={statistics.cards} />;
        default:
            return <div>Erro</div>;
    }
  };

  return (
    <GenericModal show={show} handleClose={onClose} title='Games statistics' >
      <Container className='p-2'>
        <Row>
          <div className="overflow-auto">
              <ButtonGroup className="w-100 custom-button mb-3">
                  <Button
                      className={isActiveButton('lineups')}
                      onClick={() => handleButtonState('lineups')}
                  >
                      Lineups
                  </Button>
                  <Button 
                      className={isActiveButton('ppg')}
                      onClick={() => handleButtonState('ppg')}
                  >
                      PPG
                  </Button>
                  <Button
                      className={isActiveButton('cards')}
                      onClick={() => handleButtonState('cards')}
                  >
                      Cards
                  </Button>
              </ButtonGroup>
          </div>
        </Row>
        <Row>
          {renderComponent()}
        </Row>
      </Container>
    </GenericModal>
  )
}
export default GamesModal