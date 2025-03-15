import { Container, ProgressBar } from 'react-bootstrap';

const GameStatistics = ({stats}) => {
  const formatStats = () => {
    if ( !stats || stats.length < 2 ) return {};

    const home = stats[0].statistics || []; // estatísticas da equipa da casa
    const away = stats[1].statistics || []; // estatísticas da equipa de fora

    const categories = [
      { key: "expected_goals", label: "Golos esperados (xG)", isPercentage: false },
      { key: "Ball Possession", label: "Posse de bola (%)", isPercentage: true },
      { key: "Total Shots", label: "Remates totais" },
      { key: "Shots on Goal", label: "Remates à baliza" },
      { key: "Shots off Goal", label: "Remates fora" },
      { key: "Shots insidebox", label: "Remates dentro de área" },
      { key: "Shots outsidebox", label: "Remates fora de área"},
      { key: "Blocked Shots", label: "Remates bloqueados" },
      { key: "Fouls", label: "Faltas" },
      { key: "Corner Kicks", label: "Cantos" },
      { key: "Offsides", label: "Foras de jogo" },
      { key: "Yellow Cards", label: "Cartões amarelos" },
      { key: "Red Cards", label: "Cartões vermelhos" },
      { key: "Goalkeeper Saves", label: "Defesas do guarda-redes" },
      { key: "Total passes", label: "Passes totais" },
      { key: "Passes accurate", label: "Passes certos" },
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
        <div className="text-center p-4 fw-bold rounded-4" style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
          Nenhum evento disponível
        </div>
      ) : (
        <div className='text-center p-4 fw-bold rounded-4' style={{ backgroundColor: '#4e4e4b', color: 'white' }}>
          <h4 className='d-flex fw-bold justify-content-center align-content-center mb-1'>
            Visão geral da partida
          </h4>
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