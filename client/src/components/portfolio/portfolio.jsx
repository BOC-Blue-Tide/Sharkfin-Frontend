import React, { useState, useEffect } from 'react';
import PositionTable from './positionTable.jsx';
import PortfolioChart from './portfolioChart.jsx';
import AllocationChart from './allocationChart.jsx';
import TimeRangeP from './timeRangeP.jsx';
//Lenord
import Placement from '../leaderboard/placement.jsx'
import Axios from 'axios';


const Portfolio = (props) => {
  const [userID, setUserID] = useState(props.userID);
  const [timeWindow, setTimeWindow] = useState('1W');
  const [chartData, setChartData] = useState({});
  const [alloPosData, setAlloPosData] = useState({});
  useEffect(() => {
    var paramsC = {
      userID : userID,
      timeSelect: timeWindow
    };
    var fetchChartData = async () => {
      var result = await Axios.get('/pchart', {params: paramsC});
      setChartData(result.data);
    };
    fetchChartData();
  }, [timeWindow])

  useEffect(() => {
    var paramsC = {
      userID : userID,
      timeSelect: timeWindow
    };
    const fetchData = async () => {
      var result = await Axios.get('/pallopos', {params: paramsC});
      setAlloPosData(result.data);
    };
    fetchData();
  }, [])

  const handleTimeWindowClick = (timewindow) => {
    setTimeWindow(timewindow);
  };

  return (
    <div className='portfolio-container'>
      {/* <div className='portfolio-primary-header'>
        <h1 className='portfolio-h1'>My Portfolio</h1>
      </div>
      <div className='portfolio-secondary-header'>
        <h3 className='portfolio-h3'>Good afternoon, User</h3>
      </div> */}
      <div className='greeting-net-worth-chart'>
        <div className="greeting-leaderboard">
          <Placement/>
        </div>
        <div className='portfolio-my-net-worth-chart'>
          <h2>My Net Worth</h2>
          <PortfolioChart data={chartData}/>
          <TimeRangeP handleTimeWindowClick={handleTimeWindowClick}/>
        </div>
      </div>
      <div className='portfolio-my-asset-allocation'>
        <h2>My Asset Allocation</h2>
        <AllocationChart data={alloPosData}/>
      </div>
      <div className='portolio-my-position'>
      <h2>My Positions</h2>
        <PositionTable data={alloPosData}/>
      </div>
      <div className='portfolio-disclaimer'>

      </div>
      <div className='portfolio-signature'>
        Powered By APEX DIGITAL INVESTMENTS
      </div>
    </div>
  )

}

export default Portfolio;