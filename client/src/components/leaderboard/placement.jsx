import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { daysUntilNextQuarter } from '../helper/leaderboardHelper.js';
import Topfive from './topfive.jsx';

const Placement = (props) => {
  console.log(props);
  const [friendBoard, setFriendBoard] = useState([])
  const [userId, setUserId] = useState(props.user.user_id)
  // const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("googleInfo")).id)
  const [selfPlacement, setSelfPlacement] = useState ("loading")
  const [QuarterLeft, setQuarterLeft] = useState(0)
  const [invested, setInvested] = useState(540)
  const [remaining, setRemaining] = useState(460)
  const [profilePic, setProfilePic] = useState(props.user.profilepic_url)
  // from app.jsx
  const [userInfo, setUserInfo] = useState({"id":1,"first_name":"Fanchon","profilepic_url":"http://dummyimage.com/112x132.png/dddddd/000000","performance_percentage":-38.5})



  useEffect(() => {
    getFriendBoardData(userId)
    setQuarterLeft(daysUntilNextQuarter())
  }, [])

  useEffect(() => {
    addSelfPlacement(userId)
    checkProfilePic()
  }, [friendBoard])



  const addSelfPlacement = (id) => {
    console.log(friendBoard)
    for (var x = 0; x < friendBoard.length; x ++) {
      if (friendBoard[x].id == id) {
        if (x == 0) {
          setSelfPlacement("1st")
        } else if (x == 1) {
          setSelfPlacement("2nd")
        } else if (x == 2) {
          setSelfPlacement("3rd")
        } else {
          setSelfPlacement(`${x + 1}th`)
        }
      }
    }
  }

  const getFriendBoardData = async (id) => {
    await Axios.get('/friendBoard')
    .then((response) => {
      var data = response.data
        setFriendBoard(data)
    })
  }

  const checkProfilePic = () => {
    if (profilePic !== undefined) {
      setProfilePic(userInfo.profilepic_url)
    }
  }



  return (
    <div className="mainpage-greeting-leaderboard">
      <div className="greeting-title"><h1>Good Afternoon, {props.user.firstname}</h1></div>
      <div className="profilePic-greeting-container">
        <div className="profilePic">
          {/* BG -> IMG */}
          <div className="profile-box">

            {/* <img src={ profilePic }></img> */}
            <img src={profilePic}></img>
          </div>

        </div>
        <div className="greeting">
          <div>
            <h2><span className="color-lightblue">{userInfo.performance_percentage}% growth </span>this quarter</h2>
            <h3><span className="color-gold">{selfPlacement} place </span>out of {friendBoard.length} friends</h3>
            <h3><span className="color-lightred">{QuarterLeft} more days </span>in the quarter</h3>
            <h3><span className="color-lightblue">${invested} </span>invested, <span className="color-lightblue">${remaining} </span>remaining funds</h3>
          </div>
        </div>
      </div>
      <div className="mainpage-leaderboard">
        <h3>Leaderboard</h3>
        <div className="top-five-board">
          <Topfive friendBoard = {friendBoard} />
          {/* <Link to="/leaderboard">
          <Button disabled variant="contained" color="primary">
            More
          </Button>
        </Link> */}
        </div>
      </div>
    </div>
  )

}

export default Placement;
