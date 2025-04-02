// ficheiro onde vão estar funções simples que são utilizadas em vários componentes
import { Badge } from 'react-bootstrap';

// códigos para jogos que já terminaram
export const matchFinishedCodes = ['FT', 'AET', 'PEN'];

export const formatBadge = (rating) => {
    if (rating >= 0 && rating <= 4.9) {
      return 'danger';
    } else if (rating >= 5.0 && rating <= 6.9) {
      return 'warning';
    } else if (rating >= 7.0 && rating <= 8.9) {
      return 'success';
    } else if (rating >= 9.0 && rating <= 10.0) {
      return 'primary';
    } else {
      return 'secondary';
    }
}

export const formatBadgeGame = (letter) => {
  switch (letter) {
      case 'W':
          return <Badge bg="success">{letter}</Badge>
      case 'L':
          return <Badge bg="danger">{letter}</Badge>
      case 'D':
          return <Badge bg="warning">{letter}</Badge>
      default:
          return <Badge bg="dark">{letter}</Badge>
  }
}

export const formatTeamForm = (form) => {
  if (!form || form === 'N/A') {
      return "-";
  }
  return form.split('').map((letter, index) => (
      <span key={index}>
          {formatBadgeGame(letter)}
      </span>
  ));
}

 // Função para gerar cores dinâmicas
export const generateColors = (num) => {
  const colors = [];
  const colorPalette = ['#004682 ', '#1ea9ed', '#7e0028', '#b8860b', '#bd0000', '#ff4040', '#FF9E9D', '#F5D300', '#7E8F7C']; 
  for (let i = 0; i < num; i++) {
      // Se o número de dados for maior que o número de cores disponíveis, então reutiliza as cores
      colors.push(colorPalette[i % colorPalette.length]);
  }
  return colors;
}

// Determina a cor de fundo do game card de acordo com o resultado da equipa 
export const isTeamWinner = ({game, teamID}) => {
  const teams = game?.teams;
  const homeTeamGoals = game?.score?.fulltime?.home;
  const awayTeamGoals = game?.score?.fulltime?.away;
  const isFinished = matchFinishedCodes.includes(game?.fixture?.status?.short);

  // Se os dados do jogo forem inválidos
  if (!teams || !teams.away || !teams.home) return 'bg-transparent';

  // se o jogo não acabou
  if (!isFinished) return 'bg-transparent';

  // se o jogo já acabou
  if (teams.away.id == teamID) {
      return teams.away.winner ? 'bg-success' : (awayTeamGoals < homeTeamGoals) ? 'bg-danger' : 'bg-warning';
  } 
  else if (teams.home.id == teamID) {
      return teams.home.winner ? 'bg-success' : (homeTeamGoals < awayTeamGoals) ? 'bg-danger' : 'bg-warning';
  } 
  // erro -> deixa sem cor
  else {
      return 'bg-transparent';
  }
}