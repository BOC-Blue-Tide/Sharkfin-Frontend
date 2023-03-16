import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dropdown from './orderDropDown.jsx'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import ReviewModal from './reviewOrder.jsx'

const orderCard = (props) => {

  const [orderInput, setOrderInput] = useState({})
  const [buyType, setBuyType] = useState('shares')
  const [amount, setAmount] = useState(0)
  const [open, setOpen] = useState(false);


  const handleReviewClick = () => {
    let orderInputObj = {
      buyType: buyType,
      amount: amount
    }
    setOrderInput(orderInputObj)
    setOpen(!open)

  }

  const handleBuyType = (e) => {
    setBuyType(e.target.value)
  }
  const handleAmount = (e) => {

    setAmount(e.target.value)

  }

  return (
    <>
      <CardContent >
        <Typography variant="subtitle1" component="div">
          {props.value === 0 ? <Grid container spacing={1}>
            <Grid item xs={6}>
              {`Buy in `}
            </Grid>
            <Grid item xs={6}>
              <Dropdown handleBuyType={handleBuyType} />
            </Grid>
          </Grid> : <Grid container spacing={1}>
            <Grid item xs={6}>
              {`Sell in `}
            </Grid>
            <Grid item xs={6}>
              <Dropdown handleBuyType={handleBuyType} />
            </Grid>
          </Grid>}
        </Typography>
        <Typography variant="subtitle1" component="div">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              {`Amount `}
            </Grid>
            <Grid item xs={6}>
              {props.value === 0 ?
                <TextField type="number" InputProps={{
                  inputProps: { min: 0 }
                }} label="USD" variant="standard" onInput={handleAmount} /> :
                <TextField InputProps={{
                  inputProps: { min: 0 }
                }} type="number" variant="standard" onInput={handleAmount} />
              }
            </Grid>
          </Grid>

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleReviewClick}>Review Order</Button>
      </CardActions>

      {open ? <ReviewModal handleReviewClick={handleReviewClick} orderInput={orderInput} /> : null}

    </>
  )
}

export default orderCard