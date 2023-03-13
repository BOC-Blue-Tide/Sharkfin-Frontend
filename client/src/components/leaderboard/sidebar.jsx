import React, { useRef, useState, useEffect } from 'react';
import Person from './person.jsx'

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
    //api get all friends data
    setFriendBoard([{name: "testing", gain: "testing"},{name: "testing", gain: "testing"}])
    //set first 10 to current
    setFriendCurrent([{name: "testing", gain: "testing"},{name: "testing", gain: "testing"}])
  }

  const getGlobalBoardData = async () => {
    setGlobalBoard([{name: "testing", gain: "testing"},{name: "testing", gain: "testing"}])
    setGlobalCurrent([{name: "testing", gain: "testing"},{name: "testing", gain: "testing"}, {name: "testing", gain: "testing"}])
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
      {friend && friendCurrent?.map((item, index) =>
        <Person item= {item} index= {index}/>)
      }
      {global && globalCurrent?.map((item, index) =>
        <Person item= {item} index= {index}/>)
      }
      </div>
      <div>
      <button className="addFriend-btn" onClick= {()=>{}}>Add New Friend</button>
      <button className="requestFriend-btn" onClick= {()=>{}}>View Requests</button>
      </div>
    </div>
  )

}

export default SideBar;