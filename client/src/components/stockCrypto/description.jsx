import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

const description = (props) => {
  const textLengthLimit = 50

  const [title, setTitle] = useState('')

  const [showAll, setShowAll] = useState(false)
  const [partial, setPartial] = useState(null)
  const [full, setFull] = useState('')

  useEffect(() => {
    if (props.stockObj !== undefined && Object.keys(props.stockObj).length > 0) {
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
    } else if (props.coinMeta !== undefined && Object.keys(props.coinMeta).length > 0) {
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
          <div className="full-text">
            <Typography variant="body1" style={{ p: 5 }}>{`${full}`}</Typography>
          </div>

          {<Chip label={"Show less"} onClick={showMoreOrLess} style={{ m: 6 }} />}</div> :
        <div className="partial-text" >{partial} <div className="showMoreSpan">{<Chip label={"Show more"} onClick={showMoreOrLess} style={{ m: 6 }} />}</div>
        </div>
      }
    </>
  )
}

export default description