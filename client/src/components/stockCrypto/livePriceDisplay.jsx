import React, { useState, useEffect } from 'react';

const livePriceDisplay = (props) => {

  const [livePrice, setLivePrice] = useState('')

  useEffect(() => {
    let liveData = props.liveData
    if (liveData) {
      if (liveData.length > 0) {
        setLivePrice(`$${parseFloat(liveData[0].p).toFixed(2)}`)
      }
    }
  }, [props.liveData])

  return (

    <div className="live-price">{livePrice}</div>
  )

}

export default livePriceDisplay