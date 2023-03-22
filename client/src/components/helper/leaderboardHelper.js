function daysUntilNextQuarter() {
  const now = new Date();
  const quarterMonths = [2, 5, 8, 11];

  const currentQuarterMonth = quarterMonths[Math.floor(now.getMonth() / 3)];
  const currentQuarterEnd = new Date(now.getFullYear(), currentQuarterMonth + 1, 0);

  if (now.getTime() > currentQuarterEnd.getTime()) {
    const nextQuarterMonth = quarterMonths[(Math.floor(now.getMonth() / 3) + 1) % 4];
    const nextQuarterStart = new Date(now.getFullYear(), nextQuarterMonth, 1);
    const timeDiff = nextQuarterStart.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  const timeDiff = currentQuarterEnd.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function getQuarterStartDate() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  let quarterStartDate = new Date(currentDate.getFullYear(), 0, 1);
  if (currentMonth >= 0 && currentMonth <= 2) {
    quarterStartDate.setMonth(0);
  } else if (currentMonth >= 3 && currentMonth <= 5) {
    quarterStartDate.setMonth(3);
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    quarterStartDate.setMonth(6);
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    quarterStartDate.setMonth(9);
  }
  return quarterStartDate;
}

// const dayOne = '2023-01-01';
// const dayTwo = '2023-03-21';

function isEarlier(dayOne, dayTwo) {
  const dateOne = new Date(dayOne);
  const dateTwo = new Date(dayTwo);
  return dateOne < dateTwo;
}


// 當日總資產 + 期間所有賣入所得 / 起始日總資產 ＋ 所有買入價錢 * 100





module.exports = {daysUntilNextQuarter};