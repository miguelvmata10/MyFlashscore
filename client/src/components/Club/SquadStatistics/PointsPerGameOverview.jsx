import { Table, ProgressBar, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { formatBadgeGame } from '../../../utils/helpers';

const PointsPerGameOverview = ({ statistics }) => {
    const form = statistics.form.split("");
    console.log('fd', form);

    return (
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <Table striped hover variant="dark" className='text-center'>
                <tbody>
                    <tr>
                        <td className='text-start'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='me-1'>PPG (Home):</span>
                                <ProgressBar now={60} className="flex-grow-1" />
                                <span className='ms-1'>teste</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-start'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='me-1'>PPG (Home):</span>
                                <ProgressBar now={60} className="flex-grow-1" />
                                <span className='ms-1'>teste</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className='text-start'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <span className='me-1'>PPG (Home):</span>
                                <ProgressBar now={60} className="flex-grow-1" />
                                <span className='ms-1'>teste</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        {/* <td className='text-start'>
                            <span>Form: </span>
                            {form.map((letter) => (
                                formatBadgeGame(letter)
                            ))}
                        </td> */}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
export default PointsPerGameOverview