import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useButtonGroup from '../../hooks/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Image, Row, Col } from 'react-bootstrap';
import Squad from './Squad';
import SquadStatistics from './SquadStatistics';
import useApiRequest from '../../hooks/useApiRequest';
import { fetchClubData } from '../../services/TeamsService';

const Club = () => {
    const { teamID } = useParams();
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('equipa');

    const { data: clubData, loading, error, fetchData } = useApiRequest(fetchClubData);

    useEffect(() => {
        if (teamID) {
            fetchData(teamID);
        }
    }, [teamID, fetchData]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error.message}</p>;
    if (!clubData) return <p>Nenhum dado disponível.</p>;

    const renderComponent = () => {
        switch (selected) {
            case 'equipa':
                return <Squad teamID={teamID} />;
            case 'estatisticas':
                return <SquadStatistics />
            default:
                return <div>Erro</div>;
        }
    };

    return (
        <Container className="container p-5 rounded-4">
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <Image src={clubData[0]?.team?.logo} width={60} alt="Logo do clube" />
                </Col>
                <Col>
                    <h3 className="mb-2">{clubData[0]?.team?.name}</h3>
                    <span>{clubData[0]?.venue?.name}</span><br />
                    <span>Capacidade: {clubData[0]?.venue?.capacity}</span>
                </Col>
                <Col xs="auto">
                    <Image src={clubData[0]?.venue?.image} width={200} style={{ borderRadius: '10%' }} />
                </Col>
            </Row>
            <Row>
                <ButtonGroup size="md">
                    <Button
                        className={isActiveButton('equipa')}
                        onClick={() => handleButtonState('equipa')}
                    >
                        Equipa
                    </Button>
                    <Button
                        className={isActiveButton('estatisticas')}
                        onClick={() => handleButtonState('estatisticas')}
                    >
                        Estatisticas
                    </Button>
                    <Button
                        className={isActiveButton('transferencias')}
                        onClick={() => handleButtonState('transferencias')}
                    >
                        Transferências
                    </Button>
                    <Button 
                        className={isActiveButton('resultados')} 
                        onClick={() => handleButtonState('resultados')}
                    >
                        Resultados
                    </Button>
                </ButtonGroup>
                <hr />
            </Row>
            <Row>
                {renderComponent()}
            </Row>
        </Container>
    )
}
export default Club