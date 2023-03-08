import React from 'react';
import PositionTable from './positionTable.jsx';
class Portfolio extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='portfolio-container'>
        <div className='portfolio-primary-header'>
          <h1 className='portfolio-h1'>My Portfolio</h1>
        </div>
        <div className='portfolio-secondary-header'>
          <h3 className='portfolio-h3'>Good afternoon, User</h3>
        </div>
        <div className='portfolio-my-net-worth-chart'>

        </div>
        <div className='portfolio-my-asset-allocation'>

        </div>
        <div className='portolio-my-position'>
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
}

export default Portfolio;
