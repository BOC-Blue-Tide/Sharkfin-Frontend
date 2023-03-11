import React from 'react';
import Chart from 'chart.js/auto';
import mockData from '../../../../mockdata.js';
import portfolioHelper from '../helper/portfolioHelper.js';
import { Pie } from "react-chartjs-2";

var myPortfolio = mockData.mockPortfolioData;

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

const AllocationChart = () => {
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