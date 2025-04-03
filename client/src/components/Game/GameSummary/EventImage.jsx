import Goal from '../../../assets/GameImages/Goal.png';
import RedCard from '../../../assets/GameImages/Red_card.svg.png';
import YellowCard from '../../../assets/GameImages/Yellow_card.svg.png';
import Substitution from '../../../assets/GameImages/Substitution_card.png';
import Var from '../../../assets/GameImages/VAR.png';
import Goal_PenaltyMissed from '../../../assets/GameImages/Goal_Penalty_missed.png';
import FallbackImage from '../../CommonUI/FallbackImage';

const getEventImage = (event) => {
    switch (event.type) {
        case 'Goal':
            return event.detail === 'Missed Penalty' ? Goal_PenaltyMissed : Goal;
        case 'Card':
            return event.detail === 'Yellow Card' ? YellowCard : RedCard;
        case 'subst':
            return Substitution;
        case 'Var':
            return Var;
        default:
            return null;
    }
};

const EventImage = ({ event }) => {
    const eventImage = getEventImage(event);
    return eventImage ? <FallbackImage src={eventImage} style={{ width: '25px', height: '25px', objectFit: 'contain' }} /> : null;
}
export default EventImage