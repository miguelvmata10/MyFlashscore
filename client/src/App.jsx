import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import MatchDateSelector from './components/Matchlist/MatchDateSelector';
import League from './components/League/League';
import Club from './components/Club/Club';
import PlayerProfile from './components/Members/PlayerProfile';
import CoachProfile from './components/Members/CoachProfile';
import SearchResults from './components/Search/SearchResults';
import GameMenu from './components/Game/GameMenu';
import BackButton from './components/CommonUI/BackButton';

function App() {
  // IDs das top leagues
  const topLeaguesIDs = [39, 140, 135, 78, 2, 94, 61, 3];

  return (
    <Router>
      <Container className='d-flex flex-column align-items-center' style={{ maxWidth: "1100px" }}>
        <div className="w-100">
          <Container style={{ maxWidth: "1100px" }}>
            <Navbar />
          </Container>
        </div>
        <Row className="w-100">
          {/* sidebar vertical */}
          <Col md={3} className="d-none d-md-block">
            <Sidebar topLeaguesIDs={topLeaguesIDs} orientation='vertical' />
          </Col>

          {/* sidebar horizontal -> quando o ecrã diminui */}
          <Col xs={12} className="w-100 d-md-none">
            <Sidebar topLeaguesIDs={topLeaguesIDs} orientation='horizontal'/>
          </Col>

          <Col xs={12} md={9} className="menu rounded-4 mb-2">
            <BackButton />
            <Container className="container p-4 rounded-4">
              <Routes>
                <Route path="/" element={<MatchDateSelector topLeaguesIDs={topLeaguesIDs} />} />
                <Route path="/league/:leagueID" element={<League />} />
                <Route path="/team/:teamID" element={<Club />} />
                <Route path="/player/:playerID" element={<PlayerProfile />} />
                <Route path="/coach/:coachID" element={<CoachProfile />} />
                <Route path="/search/:type/:inputValue" element={<SearchResults />} />
                <Route path="/game/:fixtureID" element={<GameMenu />} />
              </Routes>
            </Container>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
