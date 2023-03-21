import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';
import Topfive from './topfive.jsx'
import { Pagination } from '@mui/material';
import {daysUntilNextQuarter} from '../helper/leaderboardHelper.js'
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';

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
      <div className="profilePic-greeting-container">
        <div className="profilePic">
          <div className="profile-img" style={{ backgroundImage: "url('" + profilePic + "')" }} ></div>
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
          <div className="greeting-title"><h1>Good Afternoon, {selfPlace.name}</h1></div>
          <div>
            <h2><span style={{color:"#2AD6A2"}}>{selfPlace.gain}% growth </span>this quarter</h2>
            <br></br>
            <h3><span style={{color:"#FFA400"}}>{selfPlace.placement} place </span>out of {topFive.length} friends</h3>
            <br></br>
            <h3><span style={{color:"#FF3D3D"}}>{QuarterLeft} more days </span>in the quarter</h3>
            <br></br>
            <h3><span style={{color:"#2AD6A2"}}>${invested} </span>invested, <span style={{color:"#2AD6A2"}}>${remaining} </span>remaining funds</h3>
          </div>
        </div>
      </div>
      <div className="mainpage-leaderboard">
        <h3>Leaderboard</h3>
        <div className="top-five-board">
          <Topfive/>
        </div>
        <Link to="/leaderboard">
          <Button disabled variant="contained" color="primary">
            More
          </Button>
        </Link>
      </div>
    </div>
  )

}

export default Placement;