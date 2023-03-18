import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';
import Topfive from './topfive.jsx'
import { Pagination } from '@mui/material';
import {daysUntilNextQuarter} from '../helper/leaderboardHelper.js'

const Placement = () => {
  const [topFive, setTopFive] = useState([])
  const [selfPlace, setSelfPlace] = useState ({name: 'Lenord', placement:'1st', gain: 10})
  const [QuarterLeft, setQuarterLeft] = useState(0)
  const [invested, setInvested] = useState(540)
  const [remaining, setRemaining] = useState(460)



  useEffect(() => {
    getTopFiveData()
    setQuarterLeft(daysUntilNextQuarter())
    checkSelfPlace("Ab")
  }, [])

  const checkSelfPlace = (name) => {
    for (var x = 0; x < topFive.length; x ++) {
      if (topFive[x].name == name) {
        setSelfPlace({placement: x + 1, name: name, gain: topFive[x].gain})
      }
    }
  }
  const getTopFiveData = async () => {
    await Axios.get('/friendBoard')
    .then((response) => {
      var data = response.data
      setTopFive(data)
    })
  }


  return (
    <div className="mainpage-greeting-leaderboard">
      <div><h1>Good Afternoon, {selfPlace.name}</h1></div>
      <div>
        <h2>{selfPlace.gain}% growth this quarter</h2>
        <br></br>
        {selfPlace.placement} place out of {topFive.length} friends
        <br></br>
        {QuarterLeft} more days in the quarter
        <br></br>
        ${invested} invested, ${remaining} remaining funds
      </div>
      <div className="mainpage-leaderboard">
        <h3>Leaderboard</h3>
        <div className="top-five-board">
          <Topfive/>
        </div>
        <p>More</p>
      </div>
    </div>
  )

}

export default Placement;