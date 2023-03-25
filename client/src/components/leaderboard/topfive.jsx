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
      function sortObjectsByIdDesc(objects) {
        return objects.sort((a, b) => b.performance_percentage - a.performance_percentage);
      }
      const sortedData = sortObjectsByIdDesc(data);
        setFriendBoard(sortedData.slice(0, 3))
    })
  }

  var tfDiv = ""
  for (var x = 0; x < friendBoard.length; x ++) {
    var box = `<div class="tf-box">`
    var place = x + 1
    var name =friendBoard[x].first_name
    var number = Number(friendBoard[x].performance_percentage)
    var photo = friendBoard[x].profilepic_url
    var arrow = null
    var gain = null
    if (number > 0) {
      arrow = `<img class="arrow-raise" src="arrow-up.png" alt="arrow up" width="20">`
      gain = `<span style="color:green;">${friendBoard[x].performance_percentage}%</span>`
    } else {
      arrow = `<img class="arrow-raise" src="arrow-down.png" alt="arrow down" width="20">`
      gain = `<span style="color:red;">${friendBoard[x].performance_percentage}%</span>`
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
