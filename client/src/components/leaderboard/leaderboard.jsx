import React, { useRef, useState, useEffect } from 'react';
import SideBar from './sidebar.jsx'
import Placement from './placement.jsx'
import {daysUntilNextQuarter} from '../helper/leaderboardHelper.js'

const LeaderBoard = () => {
  const [dayLeft, setdayLeft] = useState(0)

    useEffect(() => {
      var day = daysUntilNextQuarter()
      setdayLeft(day)
    }, [])

  return (
    <>
      <div className="header-container">
        <h2>LEADER BOARD</h2><h3>{dayLeft} more days in the quarter</h3>
      </div>
      <div className="leaderboard-main-container">
        <div className="sidebar-container">
          <SideBar/>
        </div>
        <div className="info-container">
          <div className="investment-profile">investment profile placeholder</div>
          <div className="position-chart">transection history placeholder</div>
          <div className="pie-chart">pie chart placeholder</div>
        </div>
      </div>
      {/* <div><Placement/></div> */}
    </>
  )

}

export default LeaderBoard;