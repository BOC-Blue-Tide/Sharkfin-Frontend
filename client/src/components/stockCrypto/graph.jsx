import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import helper from './helperFunction/graphDataHelper.js'
Chart.register(...registerables)




const Graph = (props) => {
  // const [data, setData] = useState([]);
  const data = [
    {
      x: 10,
      y: 20
    }, {
      x: 12,
      y: 10
    }, {
      x: 15,
      y: 4
    }
  ]
  const [graphData, setGraphData] = useState({});

  useEffect(async () => {
    var graphData = await helper.processGraphData(props.barData)
    console.log(graphData)
    // let data = [];
    // let value = 50;
    // for (var i = 0; i < 366; i++) {
    //   let date = new Date();
    //   date.setHours(0, 0, 0, 0);
    //   date.setDate(i);
    //   value += Math.round((Math.random() < 0.5 ? 1 : 0) * Math.random() * 10);
    //   data.push({ x: date, y: value });
    // }
    // setGraphData(data)
  }, [props.barData]);

  return (

    <Line
      data={{
        datasets: [
          {
            data: graphData,
            tension: 0.2,
            backgroundColor: "black",
            borderColor: "#5AC53B",
            borderWidth: 2,
            pointBorderColor: 'rgba(0, 0, 0, 0)',
            pointBackgroundColor: 'rgba(0, 0, 0, 0)',
            pointHoverBackgroundColor: '#5AC53B',
            pointHoverBorderColor: '#000000',
            pointHoverBorderWidth: 4,
            pointHoverRadius: 6,
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltips: {
            mode: 'index',
            intersect: false
          }
        },
        interaction: {
          intersect: false,
        },
        scales: {

          x: {
            type: 'time',
            time: {
              unit: 'hour',
              // displayFormats: {
              //   hour: 'MMM D, hA'
              // }
            },
            ticks: {
              display: true
            },
            grid: {
              display: false
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
      }}
    />

  )
}

export default Graph;