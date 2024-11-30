import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import useButtonGroup from '../../hooks/useButtonGroup';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Image, Row, Col } from 'react-bootstrap';
import Squad from './Squad';

const Club = () => {
    const { teamID } = useParams();
    const [ clubData, setClubData ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const { selected, handleButtonState, isActiveButton } = useButtonGroup('equipa');

    const fetchClubData = async () => {
        try {
            const response = await api.get(`/teams/info/${teamID}`);
            setClubData(response.data.response);
        } catch (error) {
            console.error('Erro ao obter os dados do clube: ', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClubData();
    }, [teamID]);

    const renderComponent = () => {
        switch (selected) {
            case 'equipa':
                return <Squad teamID={teamID} />;
            default:
                return <div>Erro</div>;
        }
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

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
                    <Button
                        className={isActiveButton('lista')}
                        onClick={() => handleButtonState('lista')}
                    >
                        Lista
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