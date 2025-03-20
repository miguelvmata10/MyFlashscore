import { Image } from "react-bootstrap";
import country_logo from '../../assets/FallbackImages/worldMap.jpg';
import league_logo from '../../assets/FallbackImages/default_league_logo.png';
import player_logo from '../../assets/FallbackImages/default_player_logo.png';
import team_logo from '../../assets/FallbackImages/default_team_logo.png';
import genericFallback from '../../assets/FallbackImages/genericFallback.jpg';

const getFallbackImage = (type) => {
    switch (type) {
        case "league":
            return league_logo;
        case "player":
            return player_logo;
        case "team":
            return team_logo;
        case "country":
            return country_logo;
        default:
            return genericFallback;
    }
}

const FallbackImage = ({type, src, ...props}) => {
    const fallbackImage = getFallbackImage(type);

    return (
        <Image 
            src={src || fallbackImage}
            loading="lazy"
            onError={(e) => e.currentTarget.src = fallbackImage }
            {...props}
        />
    )
}

export default FallbackImage