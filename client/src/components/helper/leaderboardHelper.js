function daysUntilNextQuarter() {
  const now = new Date(); // 取得現在時間
  const quarterMonths = [2, 5, 8, 11]; // 存放每個季度的月份

  // 找出現在時間所在的季度
  const currentQuarterMonth = quarterMonths[Math.floor(now.getMonth() / 3)];
  const currentQuarterEnd = new Date(now.getFullYear(), currentQuarterMonth + 1, 0); // 找出現在季度的結束日期

  // 如果現在時間已經超過現在季度的結束日期，則找下一個季度的開始日期
  if (now.getTime() > currentQuarterEnd.getTime()) {
    const nextQuarterMonth = quarterMonths[(Math.floor(now.getMonth() / 3) + 1) % 4];
    const nextQuarterStart = new Date(now.getFullYear(), nextQuarterMonth, 1);
    const timeDiff = nextQuarterStart.getTime() - now.getTime(); // 計算剩下的毫秒數
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); // 轉換為天數並回傳
  }

  // 如果現在時間還沒到現在季度的結束日期，則直接計算剩下的天數
  const timeDiff = currentQuarterEnd.getTime() - now.getTime(); // 計算剩下的毫秒數
  return Math.ceil(timeDiff / (1000 * 3600 * 24)); // 轉換為天數並回傳
}




module.exports = {daysUntilNextQuarter};