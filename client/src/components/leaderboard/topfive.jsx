import React, { useRef, useState, useEffect } from 'react';
import Axios from 'axios';

const Topfive = (props) => {
  const [friendBoard, setFriendBoard] = useState([])

  useEffect(() => {
    getFriendBoardData()
  }, [])

  const getFriendBoardData = async () => {
    await Axios.get('/friendBoard')
    .then((response) => {
      var data = response.data
        setFriendBoard(data.slice(0, 5))
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
      arrow = `<img src="arrow-up.png" alt="arrow up" width="20">`
      gain = `<p style="color:green;">${friendBoard[x].gain}%</p>`
    } else {
      arrow = `<img src="arrow-down.png" alt="arrow down" width="20">`
      gain = `<p style="color:red;">${friendBoard[x].gain}%</p>`
    }
    box += `<div>${place}. ${name}</div><div>${gain} ${arrow}</div></div>`
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