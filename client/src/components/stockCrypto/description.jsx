import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';

const description = (props) => {
  const textLengthLimit = 30

  const [title, setTitle] = useState('')

  const [showAll, setShowAll] = useState(false)
  const [partial, setPartial] = useState(null)
  const [full, setFull] = useState('')

  useEffect(() => {
    if (props.stockObj) {
      if (props.stockObj.Name.length > 0) {
        setTitle(props.stockObj.Name)
      }
      if (props.stockObj.Description.length > 0) {
        setFull(props.stockObj.Description)
      }
      if (props.stockObj.Description.length > textLengthLimit) {
        setPartial(props.stockObj.Description.substring(0, textLengthLimit) + "...")
      }

      if (props.stockObj.Description.length < textLengthLimit) {
        setShowAll(true)
      }
    } else if (props.coinMeta) {
      if (props.coinMeta[0].name.length > 0) {
        setTitle(props.coinMeta[0].name)
      }
      if (props.coinMeta[0].description.length > 0) {
        setFull(props.coinMeta[0].description)
      }
      if (props.coinMeta[0].description.length > textLengthLimit) {
        setPartial(props.coinMeta[0].description.substring(0, textLengthLimit) + "...")
      }

      if (props.coinMeta[0].description.length < textLengthLimit) {
        setShowAll(true)
      }
    }

  }, [props.stockObj, props.coinMeta])

  const showMoreOrLess = () => {
    setShowAll(!showAll)
  }

  return (
    <>
      <div className="description-title">{title}</div>
      {showAll ?
        <div className="description">
          <div className="full-text">{`${full}`}</div>

          {<Chip label={"Show less"} onClick={showMoreOrLess} />}</div> :
        <div className="partial-text" >{partial} <div className="showMoreSpan">{<Chip label={"Show more"} onClick={showMoreOrLess} />}</div></div>
      }
    </>
  )
}

export default description