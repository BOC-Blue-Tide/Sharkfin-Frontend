import React, {useState, useEffect} from 'react';
import Chart from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { Colors } from 'chart.js';
Chart.register(Colors);

var chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'chartArea',
      align: 'center'
    },
    colors: {
      forceOverride: true
    }
  },
  maintainAspectRatio: false,
};

const AllocationChart = (props) => {
  var ratioData = props.data.allocation.ratios;
  var symbolData = props.data.allocation.symbols;
  const data = {
    labels: symbolData,
    datasets: [
      {
        data: ratioData,
      }
    ]
  };

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