import { Button, Pagination } from '@mui/material';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import AddFriends from '../Friends/AddFriends.jsx';
import ViewRequests from '../Friends/ViewRequests.jsx';
import Person from './person.jsx';

//Mengna
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SideBar = (props) => {
  console.log(props);
  const [userId, setuserId] = useState(JSON.parse(localStorage.getItem("googleInfo")).id)
  // const [userId, setuserId] = useState(1)
  const [friendRequestNum, setFriendRequestNum] = useState(0)
  const [friendBoard, setFriendBoard] = useState([])
  const [globalBoard, setGlobalBoard] = useState([])
  const [friendCurrent, setFriendCurrent] = useState([])
  const [globalCurrent, setGlobalCurrent] = useState([])
  const [friend, setFriend] = useState(true)
  const [global, setGlobal] = useState(false)
  const [friendPage, setFriendPage] = useState(1)
  const [globalPage, setGlobalPage] = useState(1)
  const [selfFriendPlacement, setSelfFriendPlacement] = useState({})
  const [selfGlobalPlacement, setSelfGlobalPlacement] = useState({})

  useEffect(() => {
    getFriendBoardData(userId)
    getGlobalBoardData()
    // getFriendRequestNum(userId)
  }, [])

  useEffect(() => {
    checkFriendPlacement(userId)
    checkGlobalPlacement(userId)
  }, [friendBoard, globalBoard])

  const getFriendRequestNum = async (id) => {
    axios.get(`http://${SERVER_URL}/getFriendRequestsByID`, {params: {user_id: id}})
    .then((response) => {
      friendRequestNum(response.data.rows.length);
    })
    .catch(err => console.log('getFriendRequestsByID', err));
  }

  const getFriendBoardData = async (userID) => {
    await Axios.get('/friendBoard', {params: {"id" : userID}})
    .then((response) => {
      var data = response.data
      setFriendBoard(data)
      if (data.length <= 10) {
        setFriendCurrent(data)
        setFriendPage(1)
      } else {
        setFriendCurrent(data.slice(0, 10))
        if (data.length%10 === 0) {
          setFriendPage(data.length / 10)
        } else {
          var pageNumber = Math.floor(data.length / 10) + 1
          setFriendPage(pageNumber)
        }
      }
    })
  }

  const getGlobalBoardData = async () => {
    await Axios.get('/globalBoard')
    .then((response) => {
      var data = response.data
      setGlobalBoard(data)
      if (data.length <= 10) {
        setGlobalCurrent(data)
        setGlobalPage(1)
      } else {
        setGlobalCurrent(data.slice(0, 10))
        if (data.length%10 === 0) {
          setGlobalPage(data.length / 10)
        } else {
          var pageNumber = Math.floor(data.length / 10) + 1
          setGlobalPage(pageNumber)
        }
      }
    })
  }

  //friend select bar
  const [currentFriendPage, setCurrentFriendPage] = useState(1)
  const handleFriendChange = (event, value) => {
    setCurrentFriendPage(value);
    var startIndex = (value - 1) * 10
    var endIndex = value * 10
    setFriendCurrent(friendBoard.slice(startIndex, endIndex))
  };
   //global select bar
   const [currentGlobalPage, setCurrentGlobalPage] = useState(1)
   const handleGlobalChange = (event, value) => {
    setCurrentGlobalPage(value);
     var startIndex = (value - 1) * 10
     var endIndex = value * 10
     setGlobalCurrent(globalBoard.slice(startIndex, endIndex))
   };

  //check self placement
  const checkFriendPlacement = (id) => {
    let newFriendBoard = {}
    for (var x = 0; x < friendBoard.length; x ++) {
      if (friendBoard[x].id == id) {
        newFriendBoard = JSON.parse(JSON.stringify(friendBoard[x]));
        newFriendBoard.placement = x + 1
        break
      } else {
        newFriendBoard.placement = undefined
        newFriendBoard.profilepic_url = props.user.profilepic_url
        newFriendBoard.firstname = props.user.firstname
      }
    }
    setSelfFriendPlacement(newFriendBoard)
  }
  const checkGlobalPlacement = (id) => {
    let newGlobalBoard = {}
    for (var x = 0; x < globalBoard.length; x ++) {
      if (globalBoard[x].id == id) {
        newGlobalBoard = JSON.parse(JSON.stringify(globalBoard[x]));
        newGlobalBoard.placement = x + 1
        break
      } else {
        newGlobalBoard.placement = undefined
        newGlobalBoard.profilepic_url = props.user.profilepic_url
        newGlobalBoard.firstname = props.user.firstname
      }
    }
    setSelfGlobalPlacement(newGlobalBoard)
  }

  //switch from friend and global view
  const friendView = () => {
    setFriend(true)
    setGlobal(false)

  }

  const globleView = () => {
    setFriend(false)
    setGlobal(true)
  }

  //friend
  const [addFriend, openAddFriend] = useState(false);
  const [friendRequest, openFriendRequest] = useState(false);

  const openAddFriendModal = () => {
    openAddFriend(true);
  };
  const closeAddFriendModal = () => {
    openAddFriend(false);
  };
  const openFriendRequestModal = () => {
    openFriendRequest(true);
  };
  const closeFriendRequestModal = () => {
    openFriendRequest(false);
  };


  var noFriendTable = `<table class="fg-table"><tr class="self-tr">
  <th><h6>-</h6></th>
  <th><div class = "small-profile-box"><img src=${JSON.parse(localStorage.getItem("googleInfo")).picture}></img></div></th>
  <th><h6>${JSON.parse(localStorage.getItem("googleInfo")).firstname}</h6></th>
  <th></th><th><h6 style="color:green;">0%</h6></th>
  </tr></table>`

  return (
    <div className = "main-wrapper">
      <div className="fg-container">
        <button className={"friend-btn " + (friend === true ? 'active' : '' )} onClick= {()=>{friendView()}}>FRIEND ({friendBoard?.length})</button>
        <button className={"global-btn " + (global === true ? 'active' : '' )}  onClick= {()=>{globleView()}}>GLOBAL ({globalBoard?.length})</button>
      </div>
      <div>
       {friend &&
          <>{friendBoard.length === 0 ? (
            <>

            <div className="empty-sidebar">
              <img src={'fake.jpg'} alt="fakeData"></img>
              <div className="empty-text">Add more friend!</div>
            </div>
            <div className="leader-table" dangerouslySetInnerHTML={{__html: noFriendTable}} />
            <div className="selective-bar"><Pagination count={10} disabled /></div>
            </>
          ) : (
          <div>
            <div className="board-table">
              <Person data = {friendCurrent} placement = {currentFriendPage} selfPlacement = {selfFriendPlacement}/>
            </div>
            <div className="selective-bar">
              <Pagination
                count={friendPage}
                page={currentFriendPage}
                onChange={handleFriendChange}
                // sx={{ width: "100%" }}
                // color='blue'
              />
            </div>
          </div>
          )}</>
        }
        {global &&
          <>{globalBoard.length === 0 ? (
            <> <div className="empty-sidebar">Start Adding Friends!</div>
            <div className="selective-bar"><Pagination count={10} disabled /></div></>
            ) : (
            <div>
                <div className="board-table">
                  <Person data = {globalCurrent} placement = {currentGlobalPage} selfPlacement = {selfGlobalPlacement}/>
                </div>
                <div className="selective-bar">
                  <Pagination count={globalPage} page={currentGlobalPage} onChange={handleGlobalChange} />
                </div>
              </div>
          )}</>
        }
      </div>
      <div className = "friend-btns">
      <Button onClick= {openAddFriendModal} variant="outlined">Add New Friend</Button>
      <Modal open={addFriend} onClose={closeAddFriendModal}>
        <div className = "friend-popup">
          <AddFriends/>
        </div>
      </Modal>
      <Button onClick= {openFriendRequestModal} variant="outlined">View Requests <span className="request-num">
        <label>{friendRequestNum}</label>
      </span></Button>
      <Modal open={friendRequest} onClose={closeFriendRequestModal}>
        <div className = "friend-popup">
          <ViewRequests/>
        </div>
      </Modal>
      </div>
    </div>
  )

}

export default SideBar;
