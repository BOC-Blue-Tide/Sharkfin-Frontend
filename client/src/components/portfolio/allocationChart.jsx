import React from 'react';
import Chart from 'chart.js/auto';
import mockDataP from '../../../../mockDataP.js';
import portfolioHelper from '../helper/portfolioHelper.js';
import { Pie } from "react-chartjs-2";

var myPortfolio = mockDataP.mockPortfolioData;

var allocation = portfolioHelper.allocationRatio(myPortfolio);
var xData = allocation.symbols;
var yData = allocation.ratios;


const data = {
  labels: xData,
  datasets: [
    {
      data: yData,
    }
  ]
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'chartArea',
      align: 'center'
    },
  },
  maintainAspectRatio: false,
}

const AllocationChart = (props) => {
  return (
    <div>
      <Pie
        data={data}
        height="200px"
        width="200px"
        options={chartOptions}
      ></Pie>
    </div>
  );
};

export default AllocationChart;