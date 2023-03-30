import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const Topfive = (props) => {
  const [friendBoard, setFriendBoard] = useState([])
  const [tfDivHTML, setTfDivHTML] = useState(`<p>Rendering</p>`)


  useEffect(() => {
    setFriendBoard(props.friendBoard)
  }, [props.friendBoard])

  useEffect(() => {
    setTfDiv()
    console.log(props.friendBoard)
  }, [friendBoard])


  const setTfDiv = () => {
    if (friendBoard.length !== 0 && friendBoard.length < 3) {
      var tfDiv = ""
      for (var x = 0; x < friendBoard.length; x ++) {
        var box = `<div class="tf-box">`
        var place = x + 1
        var first_name =friendBoard[x].firstname
        var number = Number(friendBoard[x].performance_percentage)
        var arrow = null
        var performance_percentage = null
        var photo = friendBoard[x].profilepic_url
          if (number > 0) {
            arrow = `<img class="arrow-raise" src="arrow-up.png" alt="arrow up" width="20">`
            performance_percentage = `<span style="color:green;">${friendBoard[x].performance_percentage}%</span>`
          } else {
            arrow = `<img class="arrow-raise" src="arrow-down.png" alt="arrow down" width="20">`
            performance_percentage = `<span style="color:red;">${friendBoard[x].performance_percentage}%</span>`
          }
        box += `
          <div class="leaderboard-profile">
            <div class="leaderboard-relative-box">
              <span>${place}</span>
            </div>
            <div class="leaderboard-profile-box">
              <img src=${photo}></img>
            </div>
          </div>
          <div class="leaderboard-details">
            <div class="leaderboard-first_name">${first_name}</div>
            <div>${performance_percentage} ${arrow}</div>
          </div>
        </div>`
        tfDiv += box
      }
      setTfDivHTML(tfDiv)
    }
    else if (friendBoard.length !== 0) {
      var tfDiv = ""
      for (var x = 0; x < 3; x ++) {
        var box = `<div class="tf-box">`
        var place = x + 1
        var first_name =friendBoard[x].firstname
        var number = Number(friendBoard[x].performance_percentage)
        var arrow = null
        var performance_percentage = null
        var photo = friendBoard[x].profilepic_url
          if (number > 0) {
            arrow = `<img class="arrow-raise" src="arrow-up.png" alt="arrow up" width="20">`
            performance_percentage = `<span style="color:green;">${friendBoard[x].performance_percentage}%</span>`
          } else {
            arrow = `<img class="arrow-raise" src="arrow-down.png" alt="arrow down" width="20">`
            performance_percentage = `<span style="color:red;">${friendBoard[x].performance_percentage}%</span>`
          }
        box += `
          <div class="leaderboard-profile">
            <div class="leaderboard-relative-box">
              <span>${place}</span>
            </div>
            <div class="leaderboard-profile-box">
              <img src=${photo}></img>
            </div>
          </div>
          <div class="leaderboard-details">
            <div class="leaderboard-first_name">${first_name}</div>
            <div>${performance_percentage} ${arrow}</div>
          </div>
        </div>`
        tfDiv += box
      }
      setTfDivHTML(tfDiv)
    } else {
      setTfDivHTML(`<p>Rendering</p>`)
    }
  }

  return (
        <div className="mainpage-tf" dangerouslySetInnerHTML={{__html: tfDivHTML}} />
  )
}


export default Topfive;
