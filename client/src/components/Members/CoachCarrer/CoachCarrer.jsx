import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import FallbackImage from '../../CommonUI/FallbackImage';

const CoachCarrer = ({carrer}) => {
    return carrer.length > 0 ? (
      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <Table striped hover variant="dark" className='text-center'>
          <thead>
              <tr>
                <th>De</th>
                <th>Até</th>
                <th>Clube</th>
              </tr>
          </thead>
          <tbody>
            {carrer.map((job, index) => (
              <tr key={index}>
                <td>{job.start}</td>
                <td>{job.end ? job.end : '-'}</td>
                <td>
                  <FallbackImage className="imageResize me-2" type='team' src={job.team.logo}/>
                  <Link to={`/team/${job.team.id}`} className="customLink ms-1">{job.team.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    ) : <h3><b>Sem dados de carreira</b></h3>
}

export default CoachCarrer