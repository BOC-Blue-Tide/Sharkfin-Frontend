import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { daysUntilNextQuarter } from '../helper/leaderboardHelper.js';
import Topfive from './topfive.jsx';

const Placement = (props) => {
  const [friendBoard, setFriendBoard] = useState([])
  // const [userId, setUserId] = useState(1)
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("googleInfo")).id)
  const [selfPlacement, setSelfPlacement] = useState ("loading")
  const [QuarterLeft, setQuarterLeft] = useState(0)
  const [invested, setInvested] = useState(540)
  const [remaining, setRemaining] = useState(460)
  const [profilePic, setProfilePic] = useState(JSON.parse(localStorage.getItem("googleInfo")).picture)
  // from app.jsx
  const [userInfo, setUserInfo] = useState({})



  useEffect(() => {
    getFriendBoardData(userId)
    getSelfInfo(userId)
    setQuarterLeft(daysUntilNextQuarter())
  }, [])

  useEffect(() => {
    addSelfPlacement(userId)
    checkProfilePic()
  }, [friendBoard])



  const addSelfPlacement = (id) => {
    if (friendBoard.length > 0) {
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
  }

  const getSelfInfo = async (id) => {
    await Axios.get('/getuserdetail', {params: {"id": id}})
    .then((response) => {
      console.log(response.data, 'userinfo')
      var data = response.data
      setUserInfo(data)
    })
  }

  const getFriendBoardData = async (id) => {

    await Axios.get('/friendBoard', {params: {"id" : id}})
    .then((response) => {
      var data = response.data
        setFriendBoard(data)
    })
  }

  const checkProfilePic = () => {
    if (userInfo.profilepic_url !== undefined) {
      setProfilePic(userInfo.profilepic_url)
    }
  }

  if (friendBoard.length === 0) {
    return (
      <div className="mainpage-greeting-leaderboard">
        <div className="greeting-title"><h1>Good Afternoon, {userInfo.first_name}</h1></div>
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
              <h2><span className="color-lightblue">0% growth </span>this quarter</h2>
              <h3><span className="color-gold">You didn't follow any friend yet</span></h3>
              <h3><span className="color-lightred">{QuarterLeft} more days </span>in the quarter</h3>
              <h3><span className="color-lightblue">$0 </span>invested, <span className="color-lightblue">$0 </span>remaining funds</h3>
            </div>
          </div>
        </div>
        <div className="mainpage-leaderboard">
          <h3>Leaderboard</h3>
          <div className="top-five-board">
            <div className="tf-box">
              <div className="leaderboard-profile">
                  <div className="leaderboard-relative-box">
                    <span><h6>-</h6></span>
                  </div>
                  <div className="leaderboard-profile-box">
                    <img src={profilePic}></img>
                  </div>
              </div>
              <div className="leaderboard-details">
                <div className="leaderboard-first_name">{userInfo.first_name}</div>
                <div> No data yet! </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="mainpage-greeting-leaderboard">
        <div className="greeting-title"><h1>Good Afternoon, {userInfo.first_name}</h1></div>
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
            <Topfive friendBoard = {friendBoard}/>
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

}

export default Placement;
