import React, { useRef, useState, useEffect } from 'react';

const Person = (props) => {
  var selfLine = ""
  if (Number(props.selfPlacement.performance_percentage) > 0) {
    selfLine = `<th><img src="arrow-up.png" alt="arrow up" width="20"></th><th><h6 style="color:green;">${props.selfPlacement.performance_percentage}%</h6></th>`
  } else {
    selfLine = `<th><img src="arrow-down.png" alt="arrow down" width="20"></th><th><h6 style="color:red;">${props.selfPlacement.performance_percentage}%</h6></th>`
  }
  if (props.selfPlacement.placement !== undefined) {
    var selfHTML = `<tr class="self-tr">
    <th><h6>${props.selfPlacement.placement}.</h6></th>
    <th><div class = "small-profile-box"><img src=${props.selfPlacement.profilepic_url}></img></div></th>
    <th><h6>${props.selfPlacement.firstname}</h6></th>
    ${selfLine}
    </tr>`
  } else {
    var selfHTML = `<tr class="self-tr">
    <th><h6>-</h6></th>
    <th><div class = "small-profile-box"><img src=${props.selfPlacement.profilepic_url}></img></div></th>
    <th><h6>${props.selfPlacement.firstname}</h6></th>
    ${selfLine}
    </tr>`
  }
  var tableChart = `<table class="fg-table">`
  for (var x = 0; x < props.data.length; x ++) {
    var first = (props.placement - 1) * 10 + x + 1
    var second = props.data[x].firstname
    var number = Number(props.data[x].performance_percentage)
    var photo = props.data[x].profilepic_url
    var third = ""
    var forth = ""
    var firstLine = ""
    var pic = ""
    if (first == 1) {
      firstLine = `<h6 class="number-one-place">1st</h6>`
      pic = `<div class = "small-profile-box first-place"><img src=${photo}></img></div>`
    } else if (first == 2){
      firstLine = `<h6 class="number-two-place">2nd</h6>`
      pic = `<div class = "small-profile-box second-place"><img src=${photo}></img></div>`
    } else if (first == 3){
      firstLine = `<h6 class="number-three-place">3rd</h6>`
      pic = `<div class = "small-profile-box third-place"><img src=${photo}></img></div>`
    } else {
      firstLine = `<h6>${first}.</h6>`
      pic = `<div class = "small-profile-box"><img src=${photo}></img></div>`
    }
    if (number > 0) {
      third = `<img src="arrow-up.png" alt="arrow up" width="20">`
      forth = `<h6 style="color:green;">${props.data[x].performance_percentage}%</h6>`
    } else {
      third = `<img src="arrow-down.png" alt="arrow down" width="20">`
      forth = `<h6 style="color:red;">${props.data[x].performance_percentage}%</h6>`
    }
    var insert = `<tr>
      <th>${firstLine}</th>
      <th>${pic}</th>
      <th><h6>${second}</h6></th>
      <th>${third}</th>
      <th>${forth}</th>
    </tr>`;
    tableChart += insert
  }
  tableChart += selfHTML
  tableChart += "</table>"

  if (props.data.length === 0) {
    return (
      <p>Rendering</p>
    )
  } else {
    return (
      <div>
         <div className="leader-table" dangerouslySetInnerHTML={{__html: tableChart}} />

      </div>

    )
  }
}

export default Person;