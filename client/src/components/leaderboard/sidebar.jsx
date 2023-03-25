import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';
import {Pagination} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

//Mengna
import AddFriends from '../Friends/AddFriends.jsx'
import ViewRequests from '../Friends/ViewRequests.jsx'

const SideBar = (props) => {
  const [friendBoard, setFriendBoard] = useState([])
  const [globalBoard, setGlobalBoard] = useState([])
  const [friendCurrent, setFriendCurrent] = useState([])
  const [globalCurrent, setGlobalCurrent] = useState([])
  const [friend, setFriend] = useState(true)
  const [global, setGlobal] = useState(false)
  const [friendPage, setFriendPage] = useState(1)
  const [globalPage, setGlobalPage] = useState(1)
  const [selfFriendPlacement, setSelfFriendPlacement] = useState({placement: null, photo: null, name: null, gain: null})
  const [selfGlobalPlacement, setSelfGlobalPlacement] = useState({placement: null, photo: null, name: null, gain: null})

  useEffect(() => {
    getFriendBoardData()
    getGlobalBoardData()
  }, [])

  useEffect(() => {
    checkFriendPlacement(props.userID)
    checkGlobalPlacement(props.userID)
  }, [friendBoard, globalBoard])

  const getFriendBoardData = async () => {
    await Axios.get('/friendBoard')
    .then((response) => {
      var data = response.data
      function sortObjectsByIdDesc(objects) {
        return objects.sort((a, b) => b.performance_percentage - a.performance_percentage);
      }
      const sortedData = sortObjectsByIdDesc(data);
      setFriendBoard(sortedData)
      if (data.length <= 10) {
        setFriendCurrent(sortedData)
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
      function sortObjectsByIdDesc(objects) {
        return objects.sort((a, b) => b.performance_percentage - a.performance_percentage);
      }
      const sortedData = sortObjectsByIdDesc(data);
      setGlobalBoard(sortedData)
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
    for (var x = 0; x < friendBoard.length; x ++) {
      if (friendBoard[x].id == id) {
        setSelfFriendPlacement({placement: x + 1, photo: friendBoard[x].profilepic_url, name: friendBoard[x].first_name, gain: friendBoard[x].performance_percentage})
      }
    }
  }
  const checkGlobalPlacement = (id) => {
    for (var x = 0; x < globalBoard.length; x ++) {
      if (globalBoard[x].id == id) {
        setSelfGlobalPlacement({placement: x + 1, photo: globalBoard[x].profilepic_url, name: globalBoard[x].first_name, gain: globalBoard[x].performance_percentage})
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
      <Button onClick= {openAddFriendModal} variant="outlined">Add New Friend</Button>
      <Modal open={addFriend} onClose={closeAddFriendModal}>
        <div className = "friend-popup">
          <AddFriends/>
        </div>
      </Modal>
      <Button onClick= {openFriendRequestModal} variant="outlined">View Requests <span className="request-num">
        <label>6</label>
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