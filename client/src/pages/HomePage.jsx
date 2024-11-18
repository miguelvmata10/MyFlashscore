import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Matchlist from "../components/Matchlist/Matchlist"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const HomePage = () => {
  return (
    <>
        <Container fluid>
            <Navbar />
            <Row className=" ">
                <Col md={2}><Sidebar /></Col>
                <Col md={9}><Matchlist /></Col>
            </Row>
        </Container>

    </>
  )
}

export default HomePage;