import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';
import {Pagination} from '@mui/material';
import { Modal } from '@material-ui/core';

const SideBar = () => {
  const [friendBoard, setFriendBoard] = useState([])
  const [globalBoard, setGlobalBoard] = useState([])
  const [friendCurrent, setFriendCurrent] = useState([])
  const [globalCurrent, setGlobalCurrent] = useState([])
  const [friend, setFriend] = useState(true)
  const [global, setGlobal] = useState(false)
  const [friendPage, setFriendPage] = useState(1)
  const [globalPage, setGlobalPage] = useState(1)
  const [selfFriendPlacement, setSelfFriendPlacement] = useState({placement: null, name: null, gain: null})
  const [selfGlobalPlacement, setSelfGlobalPlacement] = useState({placement: null, name: null, gain: null})

  useEffect(() => {
    getFriendBoardData()
    getGlobalBoardData()
  }, [])

  useEffect(() => {
    checkFriendPlacement("Lenord")
    checkGlobalPlacement("Lenord")
  }, [friendBoard, globalBoard])

  const getFriendBoardData = async () => {
    await Axios.get('/friendBoard')
    .then((response) => {
      var data = response.data
      setFriendBoard(data)
      if (data.length <= 10) {
        setFriendCurrent(data)
        setFriendPage(1)
      } else {
        setFriendCurrent(data.slice(0, 10))
        var friendPageNumber = Math.floor(data.length / 10)
        setFriendPage(friendPageNumber)
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
        var pageNumber = Math.floor(data.length / 10) + 1
        setGlobalPage(pageNumber)
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
  const checkFriendPlacement = (name) => {
    for (var x = 0; x < friendBoard.length; x ++) {
      if (friendBoard[x].name == name) {
        setSelfFriendPlacement({placement: x + 1, name: name, gain: friendBoard[x].gain})
      }
    }
  }
  const checkGlobalPlacement = (name) => {
    for (var x = 0; x < globalBoard.length; x ++) {
      if (globalBoard[x].name == name) {
        setSelfGlobalPlacement({placement: x + 1, name: name, gain: globalBoard[x].gain})
      }
    }
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




  return (
    <div className = "main-wrapper">
      <div className="fg-container">
        <button className={"friend-btn " + (friend === true ? 'active' : '' )} onClick= {()=>{friendView()}}>FRIEND ({friendBoard?.length})</button>
        <button className={"global-btn " + (global === true ? 'active' : '' )}  onClick= {()=>{globleView()}}>GLOBAL ({globalBoard?.length})</button>
      </div>
      <div>
       {friend &&
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
        }
          {global &&
       <div>
          <div className="board-table">
            <Person data = {globalCurrent} color="8AEADF" placement = {currentGlobalPage} selfPlacement = {selfGlobalPlacement}/>
          </div>
          <div className="selective-bar">
            <Pagination count={globalPage} page={currentGlobalPage} onChange={handleGlobalChange} />
          </div>
        </div>
        }
      </div>
      <div className = "friend-btns">
      <button className="addFriend-btn" onClick= {openAddFriendModal}>Add New Friend</button>
      <Modal open={addFriend} onClose={closeAddFriendModal}>
      <div>
        <h2>Place Modal</h2>
      </div>
      </Modal>
      <button className="requestFriend-btn" onClick= {openFriendRequestModal}>View Requests</button>
      <Modal open={friendRequest} onClose={closeFriendRequestModal}>
        <div>
          <h2>Place Modal</h2>
        </div>
      </Modal>
      <span className="request-num">
        <label>99</label>
      </span>
      </div>
    </div>
  )

}

export default SideBar;