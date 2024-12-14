import React from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Matchlist from './components/Matchlist/Matchlist';
import League from './components/League/League';
import Club from './components/Club/Club';
import PlayerProfile from './components/Members/PlayerProfile';
import CoachProfile from './components/Members/CoachProfile';
import SearchResults from './components/Search/SearchResults';
import './App.css'

function App() {
  return (
    <Router>
      <Container fluid>
      <Navbar />
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <Routes>
              <Route path='/' element={<Matchlist />}/>
              <Route path='/league/:leagueID' element={<League />} />
              <Route path='/team/:teamID' element={<Club />} />
              <Route path='/player/:playerID' element={<PlayerProfile />} />
              <Route path='/coach/:coachID' element={<CoachProfile />}/>
              <Route path='/:name/:inputValue' element={<SearchResults />}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  )
}

export default App
