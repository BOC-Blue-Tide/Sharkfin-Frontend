import React from 'react';
import Chart from 'chart.js/auto';
import mockDataP from '../../../../mockDataP.js';
import portfolioHelper from '../helper/portfolioHelper.js';
import { Line } from "react-chartjs-2";

var myPortfolio = mockDataP.mockPortfolioData;
var stockHistory = mockDataP.mockHistory;

var netWorth = portfolioHelper.GainAndLoss('GOOGL','03/08/2023', myPortfolio, stockHistory);
var xData = netWorth.timestamp;
var yData = netWorth.gainlossArr;


const data = {
  labels: xData,
  datasets: [
    {
      data: yData,
      tension: 0.2
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },

  // Modify the axis by adding scales
  scales: {
    // to remove the labels
    x: {
      ticks: {
        display: false,
      },
      grid: {
        drawBorder: false,
        display: false,
      }
    }
  }
}

const NetWorthChart = (props) => {
  return (
    <div>
      <Line
        data={data}
        options={chartOptions}
      ></Line>
    </div>
  );
};

export default NetWorthChart;