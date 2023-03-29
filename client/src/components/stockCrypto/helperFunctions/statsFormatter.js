const helpers = {
  statsFormatter: async (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K';

    } else if (num >= 1000000 && num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M';

    } else if (num >= 1000000000 && num < 1000000000000) {
      return (num / 1000000000).toFixed(1) + 'B'

    } else if (num >= 1000000000000 && num < 10000000000000000) {
      return (num / 1000000000000).toFixed(1) + 'T'

    } else if (num >= 10000000000000000 && num < 10000000000000000000) {
      return (num / 10000000000000000).toFixed(1) + 'QD'

    } else if (num >= 10000000000000000000) {
      return (num / 10000000000000000000).toFixed(1) + 'QT'

    }
    else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }

}

export default helpers