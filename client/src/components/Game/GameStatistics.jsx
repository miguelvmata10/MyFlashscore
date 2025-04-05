import { Container, ProgressBar } from 'react-bootstrap';
import NotFound from '../CommonUI/NotFound';

const GameStatistics = ({stats}) => {
  const formatStats = () => {
    if ( !stats || stats.length < 2 ) return {};

    const home = stats[0].statistics || []; // estatísticas da equipa da casa
    const away = stats[1].statistics || []; // estatísticas da equipa de fora

    const categories = [
      { key: "expected_goals", label: "Expected goals (xG)" },
      { key: "Ball Possession", label: "Ball possession (%)", isPercentage: true },
      { key: "Total Shots", label: "Total shots" },
      { key: "Shots on Goal", label: "Shots on goal" },
      { key: "Shots off Goal", label: "Shots off goal" },
      { key: "Shots insidebox", label: "Shots inside box" },
      { key: "Shots outsidebox", label: "Shots outside box"},
      { key: "Blocked Shots", label: "Blocked shots" },
      { key: "Fouls", label: "Fouls" },
      { key: "Corner Kicks", label: "Corners" },
      { key: "Offsides", label: "Offsides" },
      { key: "Yellow Cards", label: "Yellow Cards" },
      { key: "Red Cards", label: "Red cards" },
      { key: "Goalkeeper Saves", label: "GK saves" },
      { key: "Total passes", label: "Total passes" },
      { key: "Passes accurate", label: "Accurate passes" },
    ]

    return categories.map(({key, label, isPercentage}) => {
      const homeStat = home.find(stat => stat.type === key);
      const awayStat = away.find(stat => stat.type === key);

      const homeValue = homeStat ? parseFloat(homeStat.value) || 0 : 0;
      const awayValue = awayStat ? parseFloat(awayStat.value) || 0 : 0;
      const total = homeValue + awayValue || 1;

      return {
        label,
        homeValue,
        awayValue,
        homePercent: isPercentage ? homeValue : ( homeValue * 100 ) / total,
        awayPercent: isPercentage ? awayValue : ( awayValue * 100 ) / total,
      };
    })    
  }

  const formattedStats = formatStats();

  return (
    <Container>
      {Object.keys(formattedStats).length === 0 ? (
        <NotFound />
      ) : (
        <div className='text-center p-4 fw-bold rounded-4' style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
          <h5 className='d-flex fw-bold justify-content-center align-content-center mb-1'>
            Top stats
          </h5>
          <div className='p-4'>
            {formattedStats.map((stat, index) => (
              <div key={index} className='mb-4'>
                <div className='d-flex justify-content-between align-items-center mb-1'>
                  <span className='fw-bold'>{stat.homeValue}</span>
                  <h6 className='m-0 text-center'>{stat.label}</h6>
                  <span className='fw-bold'>{stat.awayValue}</span>
                </div>

                <ProgressBar className='border border-1 bg-transparent'>
                  <ProgressBar now={stat.homePercent} variant="danger" />
                  <ProgressBar now={stat.awayPercent} variant="light" />
                </ProgressBar>
              </div>
            ))}
          </div>
        </div>
      )}
    </ Container>
  )
}
export default GameStatistics