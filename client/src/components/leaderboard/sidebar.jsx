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


  useEffect(() => {
    getFriendBoardData()
    getGlobalBoardData()
  }, [])

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
            <Person data = {friendCurrent}/>
          </div>
          <div className="selective-bar">
            <Pagination count={friendPage} page={currentFriendPage} onChange={handleFriendChange} />
          </div>
        </div>
        }
          {global &&
       <div>
          <div className="board-table">
            <Person data = {globalCurrent}/>
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