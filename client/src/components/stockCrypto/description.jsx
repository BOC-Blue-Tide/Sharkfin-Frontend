import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

const description = (props) => {
  const textLengthLimit = 50

  const [showAll, setShowAll] = useState(false)
  const [partial, setPartial] = useState(null)

  useEffect(() => {
    if (props.stockObj.Description.length > textLengthLimit) {
      setPartial(props.stockObj.Description.substring(0, textLengthLimit) + "...")
    }

    if (props.stockObj.Description.length < textLengthLimit) {
      setShowAll(true)
    }
  }, [props.stockObj])

  const showMoreOrLess = () => {
    setShowAll(!showAll)
  }

  return (
    <>
      <div className="description-title">{props.stockObj.Name}</div>
      {showAll ?
        <div className="description">
          <div className="full-text">{`${props.stockObj.Description}`}</div>

          {<Chip label={"Show less"} onClick={showMoreOrLess} />}</div> :
        <div className="partial-text" >{partial} <div className="showMoreSpan">{<Chip label={"Show more"} onClick={showMoreOrLess} />}</div></div>
      }
    </>
  )
}

export default description