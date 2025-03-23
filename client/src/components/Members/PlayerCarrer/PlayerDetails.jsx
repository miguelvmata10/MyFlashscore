import { Container, Row, Col, Card } from 'react-bootstrap';

const PlayerDetails = ({details}) => {
    const translateToPortuguese = (position) => {
        switch (position) {
            case 'Goalkeeper':
                return 'Guarda-redes';
            case 'Defender':
                return 'Defesa';
            case 'Midfielder':
                return 'Médio';
            case 'Attacker':
                return 'Avançado';
            default:
                return 'N/A';
        }
    }

    return (
        <Container fluid className="p-0 container rounded-4">
            <Card className="bg-transparent text-white border-0 rounded-0">
                <Card.Body className="py-4 px-4">
                <Row className="mb-4">
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className="fw-bold mb-0">{details.player.age}</h3>
                            <small className="text-white-50">Idade</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{translateToPortuguese(details.player.position)}</h3>
                            <small className="text-white-50">Posição</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.nationality}</h3>
                            <small className="text-white-50">País</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.birth.place}</h3>
                            <small className="text-white-50">Cidade</small>
                        </div>
                    </Col>
                    
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.height}</h3>
                            <small className="text-white-50">Altura</small>
                        </div>
                    </Col>
                    <Col xs={12} sm={6} lg={2} className="mb-4">
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.weight}</h3>
                            <small className="text-white-50">Peso</small>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={6} lg={2}>
                        <div className="d-flex flex-column align-items-center text-center">
                            <h3 className=" fw-bold mb-0">{details.player.number}</h3>
                            <small className="text-white-50">Camisola nº</small>
                        </div>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default PlayerDetails