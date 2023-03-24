import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Topfive = (props) => {
  const [friendBoard, setFriendBoard] = useState([])

  useEffect(() => {
    getFriendBoardData()
  }, [])

  const getFriendBoardData = async () => {
    await Axios.get('/friendBoard')
    .then((response) => {
      var data = response.data
        setFriendBoard(data.slice(0, 3))
    })
  }

  var tfDiv = ""
  for (var x = 0; x < friendBoard.length; x ++) {
    var box = `<div class="tf-box">`
    var place = x + 1
    var name =friendBoard[x].name
    var number = Number(friendBoard[x].gain)
    var arrow = null
    var gain = null
    if (number > 0) {
      arrow = `<img class="arrow-raise" src="arrow-up.png" alt="arrow up" width="20">`
      gain = `<span style="color:green;">${friendBoard[x].gain}%</span>`
    } else {
      arrow = `<img class="arrow-raise" src="arrow-down.png" alt="arrow down" width="20">`
      gain = `<span style="color:red;">${friendBoard[x].gain}%</span>`
    }
    box += `
      <div class="leaderboard-profile">
        <div class="leaderboard-relative-box">
          <span>${place}</span>
        </div>
        <div class="leaderboard-profile-box">
          <img src="pic2.png"></img>
        </div>
      </div>
      <div class="leaderboard-details">
        <div class="leaderboard-name">${name}</div>
        <div>${gain} ${arrow}</div>
      </div>
    </div>`
    tfDiv += box
  }


  if (friendBoard.length === 0) {
    return (
      <p>Rendering</p>
    )
  } else {
    return (
         <div className="mainpage-tf" dangerouslySetInnerHTML={{__html: tfDiv}} />
    )
  }
}


export default Topfive;
