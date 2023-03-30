import React, { useRef, useState, useEffect } from 'react';
import SideBar from './sidebar.jsx'
import Placement from './placement.jsx'
import {daysUntilNextQuarter} from '../helper/leaderboardHelper.js'
//Howard
import PositionTable from '../portfolio/positionTable.jsx';
import PortfolioChart from '../portfolio/portfolioChart.jsx';
import AllocationChart from '../portfolio/allocationChart.jsx';
import Portfolio from '../portfolio/portfolio.jsx';

const LeaderBoard = (props) => {
  const [dayLeft, setdayLeft] = useState(0)
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem("googleInfo")).id)

    useEffect(() => {
      var day = daysUntilNextQuarter()
      setdayLeft(day)
    }, [])

  return (
    <>
      <div className="header-container">
        <div>
          <h2 style={{color:"#FFD300"}}>LEADER BOARD</h2>
        </div>
        <div>
          <h3><span style={{color:"#EF6F6C"}}>{dayLeft} more days </span> in the quarter</h3>
        </div>
      </div>
      <div className="leaderboard-main-container">
        <div className="sidebar-container">
          <SideBar user={props.user}/>
        </div>
        <div className="info-container">
          <Portfolio user={props.user} leaderBoardPage={true} assetData={props.assetData}/>
        </div>
      </div>
    </>
  )

}

export default LeaderBoard;