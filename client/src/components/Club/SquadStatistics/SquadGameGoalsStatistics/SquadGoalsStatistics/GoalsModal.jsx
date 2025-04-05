import GenericModal from '../../../../CommonUI/GenericModal';
import { Row, ButtonGroup, Button, Container } from 'react-bootstrap';
import useButtonGroup from '../../../../../hooks/ui/useButtonGroup';
import GoalsPerMinStats from './GoalsPerMinStats';
import CleanSheetFailedToScoreStats from './CleanSheetFailedToScoreStats';
import PenaltiesStats from './PenaltiesStats';

const GoalsModal = ({ show, onClose, statistics }) => {
  const { selected, handleButtonState, isActiveButton } = useButtonGroup('goalPMin');

  const renderComponent = () => {
    switch (selected) {
        case 'goalPMin':
            return <GoalsPerMinStats goals={statistics.goals}/>;
        case 'csAndFts':
            return <CleanSheetFailedToScoreStats statistics={statistics}/>;
        case 'penalties':
            return <PenaltiesStats penalty={statistics.penalty}/>;
        default:
            return <div>Erro</div>;
    }
  };

  return (
    <GenericModal show={show} handleClose={onClose} title='Goals statistics'>
      <Container className='p-2'>
        <Row>
          <div className="overflow-auto">
              <ButtonGroup className="w-100 custom-button mb-3">
                  <Button
                      className={isActiveButton('goalPMin')}
                      onClick={() => handleButtonState('goalPMin')}
                  >
                      Goal P/Min
                  </Button>
                  <Button
                      className={isActiveButton('penalties')}
                      onClick={() => handleButtonState('penalties')}
                  >
                      Penalties
                  </Button>
                  <Button 
                      className={isActiveButton('csAndFts')}
                      onClick={() => handleButtonState('csAndFts')}
                  >
                      CS & FTS
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
export default GoalsModal