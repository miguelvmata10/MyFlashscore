import { Table, ProgressBar, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';

const renderWinDrawLossPercentages = ({ fixtures, type }) => {
    // Garante que totalGames seja um número válido para que não seja feita divisão por 0
    const totalGames = fixtures?.played?.[type] ?? 0; 
    const totalWins = fixtures?.wins?.[type] ?? 0;
    const totalDraws = fixtures?.draws?.[type] ?? 0;
    const totalLoses = fixtures?.loses?.[type] ?? 0;

    // Verificar se totalGames é maior que 0 antes de fazer as divisões
    const totalWinGamesPercentage = totalGames > 0 ? Math.round((totalWins * 100) / totalGames) : 0;
    const totalDrawGamesPercentage = totalGames > 0 ? Math.round((totalDraws * 100) / totalGames) : 0;
    const totalLostGamesPercentage = totalGames > 0 ? Math.round((totalLoses * 100) / totalGames) : 0;

    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="button-tooltip-2">
                {totalWinGamesPercentage}%-{totalDrawGamesPercentage}%-{totalLostGamesPercentage}%
            </Tooltip>}
        >
            <ProgressBar>
                    <ProgressBar striped variant="success" now={totalWinGamesPercentage} key={1} />
                    <ProgressBar variant="warning" now={totalDrawGamesPercentage} key={2} />
                    <ProgressBar striped variant="danger" now={totalLostGamesPercentage} key={3} />
            </ProgressBar>
        </OverlayTrigger>
    );
} 

const renderTableCols = ({type, fixtures, goals}) => {
    return (
        <>
            <td>{type === 'home' ? 'Home' : 
                    type === 'away' ? 'Away' : 
                    'Total'}
            </td>
            {type === 'total' ? (
                <>
                    <td><Badge bg='light' text='black'><strong>{fixtures?.played?.[type]}</strong></Badge></td>
                    <td><Badge bg='success'><strong>{fixtures?.wins?.[type]}</strong></Badge></td>
                    <td><Badge bg='warning'><strong>{fixtures?.draws?.[type]}</strong></Badge></td>
                    <td><Badge bg='danger'><strong>{fixtures?.loses?.[type]}</strong></Badge></td>
                    <td><Badge bg='success'><strong>{goals?.for?.total?.[type]}</strong></Badge></td>
                    <td><Badge bg='danger'><strong>{goals?.against?.total?.[type]}</strong></Badge></td>

                </>
            ) : (
                <>
                    <td>{fixtures?.played?.[type]}</td>
                    <td>{fixtures?.wins?.[type]}</td>
                    <td>{fixtures?.draws?.[type]}</td>
                    <td>{fixtures?.loses?.[type]}</td>
                    <td>{goals?.for?.total?.[type]}</td> 
                    <td>{goals?.against?.total?.[type]}</td>
                </>
            )}
            <td>
                {renderWinDrawLossPercentages({fixtures, type})}
            </td>
        </>
    );
}

const TeamStatsOverview = ({ statistics }) => {
  return (
    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Table striped hover variant="dark" className='text-center'>
            <thead>
                <tr>
                    <th> </th>
                    <th>GP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>GS</th>
                    <th>GC</th>
                    <th>
                        <span style={{color: 'green'}} className='me-1'>W</span>
                        <span style={{color: 'orange'}} className='me-1'>D</span>
                        <span style={{color: 'red'}} className='me-1'>L</span>
                        <span>%</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {['home', 'away', 'total'].map((type, index) => (
                    <tr className="p-2" key={index}>
                        {renderTableCols({ type, fixtures: statistics.fixtures, goals: statistics.goals })}
                    </tr>
                ))}
                
            </tbody>
        </Table>
    </div>
  )
}
export default TeamStatsOverview