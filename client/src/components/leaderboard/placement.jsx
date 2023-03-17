import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';
import { Pagination } from '@mui/material';
import {daysUntilNextQuarter} from '../helper/leaderboardHelper.js'

const Placement = () => {
  const [topFive, setTopFive] = useState([])
  const [selfPlace, setSelfPlace] = useState ({placement:'1st', gain: 23})
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
    <div>
      {selfPlace.gain}% growth this quarter
      {selfPlace.placement} place out of {topFive.length} friends
      {QuarterLeft} more days in the quarter
      ${invested} invested, ${remaining} remaining funds
    </div>
  )

}

export default Placement;