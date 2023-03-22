import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Graph from './graph.jsx'
import TimeRange from './timeRange.jsx'
import Description from './description.jsx'
import Stats from './stats.jsx'
import Order from './orderForm/orderTab.jsx'


const stockCryptoPage = (props) => {
  const fallback = 'Data unavailable'
  var stockObj = props.stockObj
  var qouteData = props.qouteData

  const [errMsg, setErrMsg] = useState(null)
  const [livePrice, setLivePrice] = useState('')
  const [change, setChange] = useState('')



  useEffect(() => {
    let liveData = props.liveData
    if (liveData) {
      if (liveData.length > 0) {
        setLivePrice(`$${parseFloat(liveData[0].p).toFixed(2)}`)
      }
    }
  }, [props.liveData])

  useEffect(() => {
    let qouteData = props.qouteData
    if (qouteData) {
      let change = parseFloat(qouteData['09. change']).toFixed(2)

      if (change > 0) {
        setChange(`$+${change} `)
      }
      else {
        setChange(`$${change}`)
      }
    }
  }, [props.qouteData])


  useEffect(() => {
    setErrMsg(props.errorMsg)
  }, [props.errorMsg])

  return (
    <>
      {props.stockObj && props.barData && props.qouteData ?
        <div className="page-content">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Stack direction="row" spacing={1}>
                <Chip label={`${stockObj.Sector}`} variant="outlined" />
                <Chip label={`${stockObj.Industry}`} variant="outlined" />
              </Stack>
              <div className="stock-name">{stockObj.Name}</div>
              <div className="live-price">{livePrice}</div>
              <div className="today-change">{change} (${parseFloat(qouteData['10. change percent']).toFixed(2)}%) Today</div>

              <Graph barData={props.barData} liveData={props.liveData} />
              <TimeRange handleTimeRangeClick={props.handleTimeRangeClick} />
              <Description stockObj={stockObj} />
              <Stats stockObj={stockObj} barData={props.barData} qouteData={props.qouteData} />


            </Grid>
            <Grid item xs={4}>
              <Order handleOrderClick={props.handleOrderClick} stockObj={stockObj} barData={props.barData} />
            </Grid>
          </Grid>
        </div> : errMsg}
    </>


  )

}
export default stockCryptoPage

