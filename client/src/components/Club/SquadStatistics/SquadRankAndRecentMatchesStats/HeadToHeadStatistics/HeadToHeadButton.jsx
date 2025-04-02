import { useState } from 'react';
import { Button } from 'react-bootstrap';
import HeadToHead from './HeadToHead';

const HeadToHeadButton = ({ teamID, otherTeamID }) => {
    const [showH2H, setShowH2H] = useState(false);
  
    if (teamID == otherTeamID) return '';
  
    return (
      <>
        <Button variant="outline-danger" size="sm" onClick={() => setShowH2H(true)}>
          H2H
        </Button>
        {showH2H && <HeadToHead h2h={`${teamID}-${otherTeamID}`} show={showH2H} onClose={() => setShowH2H(false)} />}
      </>
    );
  };
export default HeadToHeadButton