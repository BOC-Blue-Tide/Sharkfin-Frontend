import React, {useState} from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

const NetWorthChart = (props) => {
  console.log(props);
  var timeData = props.data.time;
  var netData = props.data.net;
  const data = {
    labels: timeData,
    datasets: [
      {
        data: netData,
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
      tooltips: {
        mode: 'index',
        intersect: false
      }
    },
    interaction: {
      intersect: false,
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
    },
    y: {
      ticks: {
        display: false
      },
      grid: {
        display: false
      },
      border: {
        display: false
      }
    }
  };

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