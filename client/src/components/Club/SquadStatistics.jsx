import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Container } from 'react-bootstrap';

const SquadStatistics = ({leagueID, season}) => {
    const { teamID } = useParams()
    return (
        <div>Dados para apresentar: liga com o id {leagueID} na época {season} para a equipa com o id { teamID }. </div>
    )
}

export default SquadStatistics