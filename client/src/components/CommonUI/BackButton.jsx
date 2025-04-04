import { useLocation, useNavigate } from "react-router-dom";
import BackButtonImage from '../../assets/BackButton.png';
import FallbackImage from "./FallbackImage";

const BackButton = () => {
    const location = useLocation();
    const navigate = useNavigate();

    if (location.pathname === "/") return null;
    
    return (
        <FallbackImage 
            src={BackButtonImage} 
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer' }}
            className='mt-2'
        />
    )
}
export default BackButton