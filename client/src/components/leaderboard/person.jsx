import React, { useRef, useState, useEffect } from 'react';

const Person = (props) => {
  const [arrow, setArrow] = useState("http://")
  const [color, setColor] = useState("green")
  const placement = Number(props.index) + 1
  useEffect(() => {
    checkArrow()
  }, [])

  const checkArrow = () => {
    if (props.gain < 0) {
      setArrow("http://")
      setColor("red")
    }
  }

  if (props.item.length === 0) {
    return (
      <p>Rendering</p>
    )
  } else {
    return (
      <div>
        {`${placement} ${props.item.name} ${props.item.gain}`}

      </div>

    )
  }
}

export default Person;