import { Table, ProgressBar } from 'react-bootstrap';

const PointsPerGameOverview = ({ fixtures }) => {
    console.log('fd', fixtures);
    const { played = {}, draws = {}, wins = {} } = fixtures;

    const maxPoints = {
        total: (played.total ?? 0) * 3,
        home: (played.home ?? 0) * 3,
        away: (played.away ?? 0) * 3
    };

    const pointsGained = {
        total: (draws.total ?? 0) + (wins.total ?? 0) * 3,
        home: (draws.home ?? 0) + (wins.home ?? 0) * 3,
        away: (draws.away ?? 0) + (wins.away ?? 0) * 3
    };

    const pointsPercentage = {
        total: maxPoints.total ? (pointsGained.total * 100) / maxPoints.total : 0,
        home: maxPoints.home ? (pointsGained.home * 100) / maxPoints.home : 0,
        away: maxPoints.away ? (pointsGained.away * 100) / maxPoints.away : 0
    };

    const averagePoints = {
        total: maxPoints.total ? (3 * (pointsPercentage.total / 100)).toFixed(2) : "0.00",
        home: maxPoints.home ? (3 * (pointsPercentage.home / 100)).toFixed(2) : "0.00",
        away: maxPoints.away ? (3 * (pointsPercentage.away / 100)).toFixed(2) : "0.00"
    };


    return (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Table striped hover variant="dark" className='text-center'>
                <tbody>
                    <tr>
                        <td className='text-start'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='me-1'>PPG (Home):</span>
                                <ProgressBar now={pointsPercentage.home} className="flex-grow-1" />
                                <span className='ms-1'>{averagePoints.home}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-start'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='me-1'>PPG (Away):</span>
                                <ProgressBar now={pointsPercentage.away} className="flex-grow-1" />
                                <span className='ms-1'>{averagePoints.away}</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-start'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='me-1'><strong>PPG (Total):</strong></span>
                                <ProgressBar now={pointsPercentage.total} className="flex-grow-1" />
                                <span className='ms-1'><strong>{averagePoints.total}</strong></span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default PointsPerGameOverview