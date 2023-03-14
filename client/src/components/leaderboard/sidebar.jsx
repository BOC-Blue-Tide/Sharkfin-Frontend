import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'
import Axios from 'axios';

const SideBar = () => {
  const [friendBoard, setFriendBoard] = useState([])
  const [globalBoard, setGlobalBoard] = useState([])
  const [friendCurrent, setFriendCurrent] = useState([])
  const [globalCurrent, setGlobalCurrent] = useState([])
  const [friend, setFriend] = useState(true)
  const [global, setGlobal] = useState(false)

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
      } else {
        setFriendCurrent(data.slice(0, 11))
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
      } else {
        setGlobalCurrent(data.slice(0, 11))
      }
    })
  }

  //handle next page
  const updateFriendCurrent = () => {

  }

  const updateGlobalCurrent = () => {

  }

  //switch from friend and globle view
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
      <button className="globle-btn" onClick= {()=>{globleView()}}>GLOBAL ({globalBoard?.length})</button>
      <div>


       {friend && <Person data = {friendCurrent}/>}
       {global && <Person data = {globalCurrent}/>}


      </div>
      <div>
      <button className="addFriend-btn" onClick= {()=>{}}>Add New Friend</button>
      <button className="requestFriend-btn" onClick= {()=>{}}>View Requests</button>
      </div>
    </div>
  )

}

export default SideBar;