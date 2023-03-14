import React, { useRef, useState, useEffect } from 'react';

const Person = (props) => {

  var tableChart = `<table>`
  for (var x = 0; x < props.data.length; x ++) {
    var first = x + 1
    var second = props.data[x].name
    var number = Number(props.data[x].gain)
    var third = ""
    var forth = ""
    if (number > 0) {
      third = `<img src="arrow-up.png" alt="arrow up" width="20">`
      forth = `<h6 style="color:green;">${props.data[x].gain}%</h6>`
    } else {
      third = `<img src="arrow-down.png" alt="arrow down" width="20">`
      forth = `<h6 style="color:red;">${props.data[x].gain}%</h6>`
    }
    var insert = `<tr>
      <th><h6>${first}.</h6></th>
      <th><h6>${second}</h6></th>
      <th>${third}</th>
      <th>${forth}</th>
    </tr>`;
    tableChart += insert
  }
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