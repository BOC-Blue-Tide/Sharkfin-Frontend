import React, { useRef, useState, useEffect } from 'react';
import SideBar from './sidebar.jsx'
import Placement from './placement.jsx'

const LeaderBoard = () => {

  return (
    <div>
      <div className="header-container">
        <section className = "menu">
          menu placehoader
        </section>
        <section className = "countdown">
          countdown placehoader
        </section>
      </div>
      <div className="info-container">
        <section className = "sideBar">
          <SideBar/>
        </section>
        <section className = "details">
          details placehoader
        </section>
      </div>
      <div><Placement/></div>
    </div>

  )

}

export default LeaderBoard;