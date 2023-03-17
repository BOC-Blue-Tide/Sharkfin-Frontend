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
        <div>
          <h2 style={{color:"#FFD300"}}>LEADER BOARD</h2>
        </div>
        <div className ="leaderboard-title">
          <h3 style={{color:"#EF6F6C"}}>{dayLeft} more days</h3> <h3> in the quarter</h3>
        </div>
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
      <div><Placement/></div>
    </>
  )

}

export default LeaderBoard;