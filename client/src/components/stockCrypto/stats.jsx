import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';

const stats = (props) => {
  var stockObj = props.stockObj
  var qouteData = props.qouteData
  const fallback = 'Data unavailable'
  return (
    <>
      <div className="stats-title">Stats</div>
      {props.stockObj && props.qouteData ?
        <Stack direction="row" spacing={1}>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Open"
                secondary={`$${qouteData['02. open']}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Today's High"
                secondary={`$${qouteData['03. high']}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Today's Low"
                secondary={`$${qouteData['04. low']}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="52 wk High"
                secondary={`$${stockObj['52WeekHigh']}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="52 wk Low"
                secondary={`$${stockObj['52WeekLow']}`}
              />
            </ListItem>
          </List>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="volume"
                secondary={`${qouteData['06. volume']}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Market Cap"
                secondary={`${stockObj.MarketCapitalization}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Price/ Earning Ratio"
                secondary={`${stockObj.PERatio}`}
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