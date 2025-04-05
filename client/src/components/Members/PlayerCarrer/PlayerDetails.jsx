import { Container, Row, Col, Card } from 'react-bootstrap';
import NotFound from '../../CommonUI/NotFound';

const PlayerDetails = ({ details }) => {
    if (!details) return <NotFound />;
    const player = details.player;

    const infoItems = [
        { label: 'Age', value: player.age },
        { label: 'Position', value: player.position },
        { label: 'Country', value: player.nationality },
        { label: 'City', value: player.birth?.place },
        { label: 'Height', value: player.height },
        { label: 'Weight', value: player.weight },
        { label: 'Shirt nº', value: player.number },
    ];

    return (
        <Container fluid className="p-0 container rounded-4">
            <Card className="bg-transparent text-white border-0 rounded-0">
                <Card.Body className="py-4 px-4">
                    <Row>
                        {infoItems.map(({ label, value }) => (
                            <Col key={label} xs={12} sm={6} lg={2} className="mb-4">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <h3 className="fw-bold mb-0">{value ?? 'N/A'}</h3>
                                    <small className="text-white-50">{label}</small>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PlayerDetails;
