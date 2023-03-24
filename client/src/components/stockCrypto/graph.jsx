import React, { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import helper from './helperFunctions/graphDataHelper.js'
Chart.register(...registerables)




const Graph = (props) => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    (async () => {
      if (props.barData) {
        var graphData = await helper.processGraphData(props.barData)
        //console.log(graphData)
        setGraphData(graphData)
      } else if (props.coinBarData) {
        var graphData = await helper.processGraphData(props.coinBarData)
        //console.log(graphData)
        setGraphData(graphData)
      }
    })()
  }, [props.barData, props.coinBarData]);

  useEffect(() => {
    (async () => {
      if (graphData.length > 0 && props.liveData) {
        let graphDataArr = graphData
        var newGraphData = await helper.addNewDataToGraph(graphDataArr, props.liveData)
        // console.log('newGraphData', newGraphData)
        setGraphData(newGraphData)
      }
    })()
  }, [props.liveData])

  return (

    <Line
      data={{
        // labels: graphData.xAxis,
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
            // time: {
            //   unit: 'day',
            //   // displayFormats: {
            //   //   hour: 'MMM D, hA'
            //   // }
            // },
            ticks: {
              display: false
            },
            grid: {
              display: false
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

        }
      }}
    />

  )
}

export default Graph;