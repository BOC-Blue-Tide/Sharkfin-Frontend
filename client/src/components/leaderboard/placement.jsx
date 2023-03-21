import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { daysUntilNextQuarter } from '../helper/leaderboardHelper.js';
import Topfive from './topfive.jsx';

const Placement = () => {
  const [topFive, setTopFive] = useState([])
  const [selfPlace, setSelfPlace] = useState ({name: 'Lenord', placement:'5th', gain: 10})
  const [QuarterLeft, setQuarterLeft] = useState(0)
  const [invested, setInvested] = useState(540)
  const [remaining, setRemaining] = useState(460)
  const [profilePic, setProfilePic] = useState("pic1.png")
  const [picSlect, showPicSlect] = useState(false);



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

  const checkProfilePic = () => {
    //axios get if defined
    setProfilePic("pic2.png")
    //if not use google account photo
  }

  const updateProfilePic = (url) => {
    setProfilePic(url)
    //axios post update database profilePic
  }

  const openPicSlect = () => {
    showPicSlect(true);
  };
  const closePicSlect = () => {
    showPicSlect(false);
  };


  return (
    <div className="mainpage-greeting-leaderboard">
      <div className="greeting-title"><h1>Good Afternoon, {selfPlace.name}</h1></div>
      <div className="profilePic-greeting-container">
        <div className="profilePic">
          {/* BG -> IMG */}
          <div className="profile-box">

            {/* <img src={ profilePic }></img> */}
            <img src={profilePic}></img>
          </div>
          <div className = "friend-btns">
            <Button onClick= {openPicSlect} variant="outlined">Chage Photo</Button>
            <Modal open={picSlect} onClose={closePicSlect}>
              <div className = "friend-popup">
                hello
              </div>
            </Modal>
          </div>
        </div>
        <div className="greeting">
          <div>
            <h2><span className="color-lightblue">{selfPlace.gain}% growth </span>this quarter</h2>
            <h3><span className="color-gold">{selfPlace.placement} place </span>out of {topFive.length} friends</h3>
            <h3><span className="color-lightred">{QuarterLeft} more days </span>in the quarter</h3>
            <h3><span className="color-lightblue">${invested} </span>invested, <span className="color-lightblue">${remaining} </span>remaining funds</h3>
          </div>
        </div>
      </div>
      <div className="mainpage-leaderboard">
        <h3>Leaderboard</h3>
        <div className="top-five-board">
          <Topfive/>
          <Link to="/leaderboard">
          <Button disabled variant="contained" color="primary">
            More
          </Button>
        </Link>
        </div>
      </div>
    </div>
  )

}

export default Placement;
