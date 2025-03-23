// ficheiro onde vão estar funções simples que são utilizadas em vários componentes
import { Badge } from 'react-bootstrap';

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