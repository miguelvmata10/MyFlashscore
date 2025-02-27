import { Table, Image } from 'react-bootstrap';

const CoachCarrer = ({carrer}) => {
    console.log('CARREIRA: ', carrer.length)
    return (
            <Table striped hover responsive variant="dark">
              <thead>
                  <tr>
                    <th>De</th>
                    <th>Até</th>
                    <th>Clube</th>
                  </tr>
              </thead>
              <tbody>
                
              </tbody>
            </Table>
        );
}
export default CoachCarrer