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
import Divider from '@mui/material/Divider';
import ReviewModal from './reviewOrder.jsx'
import CryptoReviewModal from './cryptoReviewOrder.jsx'

const orderCard = (props) => {
  const [orderInput, setOrderInput] = useState({})
  const [orderIn, setOrderIn] = useState('')
  const [amount, setAmount] = useState()
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  const [openErr, setOpenErr] = useState(false)


  const handleReviewClick = () => {
    if (!openErr) {
      if (amount === 0 || amount === undefined || orderIn.length === 0) {

        setErrMsg('Invalid input')
      } else {
        let orderInputObj = {
          orderIn: orderIn,
          amount: amount
        }
        setOrderInput(orderInputObj)
        setOpen(!open)
      }
    }


  }

  const handleOrderIn = (e) => {
    setOrderIn(e.target.value)
  }

  const handleAmount = (e) => {

    if (e.target.value <= 0) {
      setOpenErr(true)
      setErrMsg('Invalid number')
    } else {
      setOpenErr(false)
      setErrMsg('')
      setAmount(e.target.value)
    }

  }

  return (
    <>
      <CardContent>
        <Typography variant="subtitle1" component="div">
          {props.value === 0 ? <Grid container spacing={1}>
            <Grid item xs={6}>
              {`Buy in `}
            </Grid>
            <Grid item xs={6}>
              <Dropdown handleOrderIn={handleOrderIn} pageType={props.pageType} />
            </Grid>
          </Grid> : <Grid container spacing={1}>
            <Grid item xs={6}>
              {`Sell in `}
            </Grid>
            <Grid item xs={6}>
              <Dropdown handleOrderIn={handleOrderIn} pageType={props.pageType} />
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
                <TextField type="number" helperText={errMsg} InputProps={{
                  inputProps: { min: 0 }
                }} type="number" variant="standard" onInput={handleAmount} /> :
                <TextField InputProps={{
                  inputProps: { min: 0 }
                }} type="number" helperText={errMsg} variant="standard" onInput={handleAmount} />
              }
            </Grid>
          </Grid>

        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small" onClick={handleReviewClick}>Review Order</Button>
      </CardActions>

      {open && orderIn.length > 0 ? (props.pageType === "stock" ?
        (<ReviewModal
          handleReviewClick={handleReviewClick}
          value={props.value}
          handleOrderClick={props.handleOrderClick}
          barData={props.barData}
          stockObj={props.stockObj}
          orderInput={orderInput}
          orderIn={orderIn}
        />)
        : (<CryptoReviewModal
          handleReviewClick={handleReviewClick}
          handleOrderClick={props.handleOrderClick}
          value={props.value}
          orderInput={orderInput}
          coinMeta={props.coinMeta}
          coinBarData={props.coinBarData}
          coinToday={props.coinToday}
          coinPrevious={props.coinPrevious}
          orderIn={orderIn}
        />)
      ) : (null)}

    </>
  )
}

export default orderCard