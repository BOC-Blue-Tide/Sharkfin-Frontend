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

  var tableChart = `<table class="tf-table">`
  var insertLineOne = `<tr>`
  for (var x = 0; x < friendBoard.length; x ++) {
    var place = x + 1
    var name =friendBoard[x].name
    insertLineOne += `<th>${place}. ${name}</th>`
  }
  insertLineOne += `</tr>`

  var insertLineTwo = `<tr>`
  for (var x = 0; x < friendBoard.length; x ++) {
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
    insertLineTwo += `<th>${gain}${arrow}</th>`
  }
  insertLineTwo += `</tr>`
  tableChart += insertLineOne
  tableChart += insertLineTwo
  tableChart += "</table>"

  if (friendBoard.length === 0) {
    return (
      <p>Rendering</p>
    )
  } else {
    return (
         <div className="mainpage-table" dangerouslySetInnerHTML={{__html: tableChart}} />

    )
  }
}


export default Topfive;