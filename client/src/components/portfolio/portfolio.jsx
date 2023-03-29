import React, { useState, useEffect } from 'react';
import PositionTable from './positionTable.jsx';
import PortfolioChart from './portfolioChart.jsx';
import AllocationChart from './allocationChart.jsx';
import TimeRangeP from './timeRangeP.jsx';
//Lenord
import Placement from '../leaderboard/placement.jsx'
import PaidIcon from '@mui/icons-material/Paid';
import Axios from 'axios';


const Portfolio = (props) => {
  const userID = props.user.user_id;
  const [timeWindow, setTimeWindow] = useState('1W');
  const [chartData, setChartData] = useState({});
  const [alloPosData, setAlloPosData] = useState({totalNetWorth: 0, position: [], allocation : {symbols: [], ratios: []}});

  useEffect(() => {
    var paramsC = {
      user_id : userID,
      timeSelect: timeWindow
    };
    var fetchChartData = async () => {
      await Axios.get('/pchart', {params: paramsC})
        .then((result) => {
          setChartData(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    fetchChartData();
  }, [timeWindow, userID]);

  useEffect(() => {
    var paramsAP = {
      user_id : userID
    };
    const fetchAlloPosData = async () => {
      await Axios.get('/pallopos', {params: paramsAP})
        .then((result) => {
          console.log(result.data);
          setAlloPosData(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    fetchAlloPosData();
  }, [userID])

  const handleTimeWindowClick = (timewindow) => {
    setTimeWindow(timewindow);
  };

  return (
    <div className='portfolio-container'>
      <div className='greeting-net-worth-chart'>
        <div className="greeting-leaderboard">
          {/* <Placement user={props.user}/> */}
        </div>
        <div className='portfolio-my-net-worth-chart'>
          <h2>My Net Worth</h2>
          <h2>${alloPosData.totalNetWorth}</h2>
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
      <div className='portfolio-signature'>
        Powered By APEX DIGITAL INVESTMENTS
      </div>
    </div>
  )

}

export default Portfolio;