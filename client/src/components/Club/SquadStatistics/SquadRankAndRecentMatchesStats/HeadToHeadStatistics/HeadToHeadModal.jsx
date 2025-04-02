import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import GenericModal from '../../../../CommonUI/GenericModal';
import GameCard from '../../../../Game/GameCard/GameCard';
import { isTeamWinner } from '../../../../../utils/helpers';
import NotFound from '../../../../CommonUI/NotFound';

const HeadToHeadModal = ({ headToheadData, onClose, show }) => {
    const { teamID } = useParams();

    return (
        <GenericModal show={ show } handleClose={ onClose } title='Head to head'>
            <Container>
                {headToheadData.length > 0 ? 
                <>
                    <h6>Last {headToheadData.length} games</h6>
                    <div>
                        {headToheadData.map((game, index) => (
                            <GameCard key={index} GameData={game} bgColor={isTeamWinner({ game: game, teamID: teamID })}/>
                        ))}     
                    </div>
                </> : <NotFound />}
            </Container>
        </GenericModal>
    )
}
export default HeadToHeadModal