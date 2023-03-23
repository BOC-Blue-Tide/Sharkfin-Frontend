import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';


const cryptoState = (props) => {
  var coinToday = props.coinToday
  var coinPrevious = props.coinPrevious
  const fallback = 'Data unavailable'

  return (
    <>
      <div className="stats-title">Today's Open/ Close</div>
      {props.coinToday ?
        <Stack direction="row" spacing={1}>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Open"
                secondary={`$${parseFloat(coinToday.open).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Close"
                secondary={`$${parseFloat(coinToday.close).toFixed(2)}`}
              />
            </ListItem>
          </List>
        </Stack> : fallback}

      <div className="stats-title">Previous Close</div>
      {props.coinPrevious ?
        <Stack direction="row" spacing={1}>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Open"
                secondary={`$${parseFloat(coinPrevious[0].o).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Close"
                secondary={`$${parseFloat(coinPrevious[0].c).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Highest Price"
                secondary={`$${parseFloat(coinPrevious[0].h).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Lowest Price"
                secondary={`$${parseFloat(coinPrevious[0].l).toFixed(2)}`}
              />
            </ListItem>
          </List>
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary="Trading Volume"
                secondary={`${parseFloat(coinPrevious[0].v).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Number of Transactions"
                secondary={`${parseFloat(coinPrevious[0].n).toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Volume Weighted Average Price"
                secondary={`$${parseFloat(coinPrevious[0].vw).toFixed(2)}`}
              />
            </ListItem>
          </List>
        </Stack> : fallback}
    </>
  )
}

export default cryptoState