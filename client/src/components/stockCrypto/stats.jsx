import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import helpers from './helperFunctions/statsFormatter.js'

const stats = (props) => {
  console.log(props)
  var stockObj = props.stockObj
  var qouteData = props.qouteData
  const fallback = 'Data unavailable'

  const [volume, setVolume] = useState('')
  const [marketCap, setMarketcap] = useState('')

  useEffect(() => {
    (async () => {
      if (stockObj.MarketCapitalization) {
        if (stockObj.MarketCapitalization.length > 0) {
          let formattedMarketCap = await helpers.statsFormatter(stockObj.MarketCapitalization)
          setMarketcap(formattedMarketCap)
        }
      }

    })()
  }, [props.stockObj])

  useEffect(() => {
    (async () => {
      if (qouteData) {
        if (qouteData['06. volume'].length > 0) {
          let formattedVolume = await helpers.statsFormatter(qouteData['06. volume'])
          setVolume(formattedVolume)
        }
      }
    })()
  }, [props.qouteData])

  return (
    <>
      <div className="stats-title">Stats</div>
      {props.stockObj && props.qouteData ?
        <Stack direction="row" spacing={1}>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Open"
                secondary={`$${parseFloat(qouteData['02. open']).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Today's High"
                secondary={`$${parseFloat(qouteData['03. high']).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Today's Low"
                secondary={`$${parseFloat(qouteData['04. low']).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="52 wk High"
                secondary={`$${parseFloat(stockObj['52WeekHigh']).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="52 wk Low"
                secondary={`$${parseFloat(stockObj['52WeekLow']).toFixed(2)}`}
              />
            </ListItem>
          </List>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="volume"
                secondary={`${volume}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Market Cap"
                secondary={`${marketCap}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Price/ Earning Ratio"
                secondary={`$${parseFloat(stockObj.PERatio).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dividend Yield"
                secondary={`${stockObj.DividendYield}`}
              />
            </ListItem>
          </List>
        </Stack> : fallback}
    </>
  )

}

export default stats