import React from 'react';
import Chart from 'chart.js/auto';
import mockDataP from '../../../../mockDataP.js';
import portfolioHelper from '../helper/portfolioHelper.js';
import { Line } from "react-chartjs-2";

var myPortfolio = mockDataP.mockPortfolioData;
var stockHistory = mockDataP.mockHistory;

var netWorth = portfolioHelper.GainAndLoss('GOOGL', '03/08/2023', myPortfolio, stockHistory);
var xData = netWorth.timestamp;
var yData = netWorth.gainlossArr;


const data = {
  labels: xData,
  datasets: [
    {
      data: yData,
      tension: 0.2,
      backgroundColor: "black",
      borderColor: "#5AC53B",
      borderWidth: 2,
      pointBorderColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(0, 0, 0, 0)',
      pointHoverBackgroundColor: '#5AC53B',
      pointHoverBorderColor: '#000000',
      pointHoverBorderWidth: 4,
      pointHoverRadius: 6
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
    },
    y: {
      ticks: {
        display: true
      },
      grid: {
        display: false
      },
      border: {
        display: false
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