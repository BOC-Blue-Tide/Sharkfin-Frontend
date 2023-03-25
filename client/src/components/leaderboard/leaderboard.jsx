import React, { useRef, useState, useEffect } from 'react';
import SideBar from './sidebar.jsx'
import Placement from './placement.jsx'
import {daysUntilNextQuarter} from '../helper/leaderboardHelper.js'
//Howard
import PositionTable from '../portfolio/positionTable.jsx';
import PortfolioChart from '../portfolio/portfolioChart.jsx';
import AllocationChart from '../portfolio/allocationChart.jsx';

const LeaderBoard = (props) => {
  const [dayLeft, setdayLeft] = useState(0)
  const [userID, setUserID] = useState(props.userID)

    useEffect(() => {
      var day = daysUntilNextQuarter()
      // console.log(JSON.parse(localStorage.getItem("googleInfo")) )
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
          <SideBar userID = {userID}/>
        </div>
        {/* <div className="info-container">
          <div className="investment-profile-leaderboard">
            <h2>My Net Worth</h2>
            <PortfolioChart/>
          </div>
          <div className="position-chart-leaderboard">
            <h2>My Positions</h2>
            <PositionTable/>
          </div>
          <div className="pie-chart-leaderboard">
            <h2>My Asset Allocation</h2>
            <AllocationChart/>
          </div>
        </div> */}
      </div>
    </>
  )

}

export default LeaderBoard;