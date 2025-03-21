// ficheiro onde vão estar funções simples que são utilizadas em vários componentes

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