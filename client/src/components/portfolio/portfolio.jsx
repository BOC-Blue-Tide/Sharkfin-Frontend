import React, { useState } from 'react';
import PositionTable from './positionTable.jsx';
import PortfolioChart from './portfolioChart.jsx';
import AllocationChart from './allocationChart.jsx';
//Lenord
import Placement from '../leaderboard/placement.jsx'

const Portfolio = (props) => {

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
          <PortfolioChart/>
        </div>
      </div>
      <div className='portfolio-my-asset-allocation'>
        <h2>My Asset Allocation</h2>
        <AllocationChart/>
      </div>
      <div className='portolio-my-position'>
      <h2>My Positions</h2>
        <PositionTable/>
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
