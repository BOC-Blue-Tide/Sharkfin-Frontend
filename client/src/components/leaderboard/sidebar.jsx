import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';
import { Pagination } from '@mui/material';

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
    checkFriendPlacement("Ab")
    checkGlobalPlacement("Farris")
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
        setSelfGlobalPlacement({placement: x + 1, name: name, gain: friendBoard[x].gain})
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

  return (
    <div>
      <button className="friend-btn" onClick= {()=>{friendView()}}>FRIEND ({friendBoard?.length})</button>
      <button className="global-btn" onClick= {()=>{globleView()}}>GLOBAL ({globalBoard?.length})</button>
      <div>


       {friend &&
       <div>
          <div className="board-table">
            <Person data = {friendCurrent} placement = {currentFriendPage} selfPlacement = {selfFriendPlacement}/>
          </div>
          <div className="selective-bar">
            <Pagination count={friendPage} page={currentFriendPage} onChange={handleFriendChange} />
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
      <div>

      </div>
      <div>
      <button className="addFriend-btn" onClick= {()=>{}}>Add New Friend</button>
      <button className="requestFriend-btn" onClick= {()=>{}}>View Requests</button>
      </div>
    </div>
  )

}

export default SideBar;