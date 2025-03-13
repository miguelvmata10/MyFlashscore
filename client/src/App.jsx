import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  // ids das top leagues
  const topLeaguesIDs = [39, 140, 135, 78, 2, 94, 61, 3];

  return (
    <Router>
      <Container className='ps-5 pb-5 pe-5'>
        <Navbar />
        <Row className='ps-5 pb-5 pe-5'>
          <Col xs={12} sm={0} md={3} >
            <Sidebar topLeaguesIDs={topLeaguesIDs}/>
          </Col>
          <Col xs={12} sm={12} md={9} className="menu p-3 rounded-4 mb-2">
            <Routes>
              <Route path='/' element={<MatchDateSelector topLeaguesIDs={topLeaguesIDs}/>} />
              <Route path='/league/:leagueID' element={<League />} />
              <Route path='/team/:teamID' element={<Club />} />
              <Route path='/player/:playerID' element={<PlayerProfile />} />
              <Route path='/coach/:coachID' element={<CoachProfile />} />
              <Route path='/:name/:inputValue' element={<SearchResults />} />
              <Route path='/game/:fixtureID' element={<GameMenu />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App
