import { Badge } from 'react-bootstrap';

const StandingsDescriptions = ({ descriptionsByLeague, descriptionColorMap }) => {

    return (
        descriptionsByLeague && descriptionsByLeague.map(( description, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
                <Badge 
                    className="border border-primary"
                    bg='custom' 
                    style={{ width: "12px", height: "12px", display: "inline-block", backgroundColor: descriptionColorMap[description]}}>
                </Badge>
                <span className='ms-1'>- {description}</span>
                <br />
            </div>
        ))
    )
}
export default StandingsDescriptions