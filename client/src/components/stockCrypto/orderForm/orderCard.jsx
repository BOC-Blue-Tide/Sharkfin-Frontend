import React, { useState, useEffect } from 'react';
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
import helpers from '../helperFunctions/calculateOrder.js'

const orderCard = (props) => {
  const [orderInput, setOrderInput] = useState({})
  const [orderIn, setOrderIn] = useState('')
  const [amount, setAmount] = useState()
  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  const [openErr, setOpenErr] = useState(false)
  const [availBalance, setAvailBalance] = useState(0)
  const [holding, setHolding] = useState(0)
  const [showHolding, setShowHolding] = useState(false)
  const [orderMsg, setOrderMsg] = useState('')
  const [displayAvailBalance, setDisplayAvailBalance] = useState(0)


  useEffect(() => {
    if (props.assetData.availBalance) {
      let formattedAvailBalance = parseFloat(props.assetData.availBalance).toFixed(2)
      setAvailBalance(props.assetData.availBalance)
      setDisplayAvailBalance(formattedAvailBalance)
    }
  }, [props.assetData.availBalance])

  useEffect(() => {
    if (props.assetData.holding) {
      var newholding = parseFloat(props.assetData.holding.toFixed(2))
      setHolding(newholding)
    }
  }, [props.assetData.holding, orderIn])

  useEffect(() => {
    if (orderIn === 'shares' || orderIn === 'coins') {

      setShowHolding(true)
    } else {
      setShowHolding(false)
    }
  }, [orderIn])




  const handleReviewClick = async () => {
    if (!openErr) {
      if (amount === 0 || amount === undefined || orderIn.length === 0) {

        setErrMsg('Invalid input')
      } else {
        let orderCheckPass
        if (props.pageType === 'stock') {
          orderCheckPass = await helpers.calculateOrder(amount, orderIn, availBalance, holding, props.value, props.barData[props.barData.length - 1].c)
        } else {
          orderCheckPass = await helpers.calculateOrder(amount, orderIn, availBalance, holding, props.value, props.coinBarData[props.coinBarData.length - 1].c)
        }
        //console.log('checkOrder', orderCheckPass)
        if (orderCheckPass) {
          let orderInputObj = {
            orderIn: orderIn,
            amount: amount
          }
          setOrderInput(orderInputObj)
          setOpen(!open)
        } else {
          setOrderMsg(`You do not have enough fund/ ${orderIn}`)
        }
      }
    }
  }


  const handleOrderIn = (e) => {
    setOrderIn(e.target.value)
  }

  const handleAmount = (e) => {
    setOrderMsg('')
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
      <CardContent >
        <Typography variant="body1" component="div" style={{ fontFamily: 'sans-Serif' }}>
          {props.value === 0 ? <Grid container spacing={1}>
            <Grid item xs={8} >
              {`Available Fund: `}
            </Grid>
            <Grid item xs={4}>
              {displayAvailBalance}
            </Grid>
          </Grid> : null}
        </Typography>

        <Typography variant="body1" component="div" style={{ fontFamily: 'sans-Serif' }}>
          {showHolding ? <Grid container spacing={1}>
            <Grid item xs={8}>
              {`Current Holding: `}
            </Grid>
            <Grid item xs={4}>
              {holding}
            </Grid>
          </Grid> : null}
        </Typography>

        <Typography variant="body1" component="div" style={{ fontFamily: 'sans-Serif' }}>
          {props.value === 0 ? <Grid container spacing={1}>
            <Grid item xs={6} style={{ padding: 20 }} >
              {`Buy in `}
            </Grid>
            <Grid item xs={6}>
              <Dropdown handleOrderIn={handleOrderIn} pageType={props.pageType} />
            </Grid>
          </Grid> : <Grid container spacing={1}>
            <Grid item xs={6} style={{ padding: 20 }} >
              {`Sell in `}
            </Grid>
            <Grid item xs={6}>
              <Dropdown handleOrderIn={handleOrderIn} pageType={props.pageType} />
            </Grid>
          </Grid>}
        </Typography>
        <Typography variant="body1" component="div" style={{ fontFamily: 'sans-Serif' }} >
          <Grid container spacing={1}>
            <Grid style={{ padding: 20 }} item xs={6}>
              {`Amount `}
            </Grid>
            <Grid item xs={6}>
              {props.value === 0 ?
                <TextField style={{ maxWidth: 150 }} type="number" helperText={errMsg} InputProps={{
                  inputProps: { min: 0 }
                }} type="number" variant="standard" onInput={handleAmount} /> :
                <TextField style={{ maxWidth: 150 }} InputProps={{
                  inputProps: { min: 0 }
                }} type="number" helperText={errMsg} variant="standard" onInput={handleAmount} />
              }
            </Grid>
          </Grid>

        </Typography>
      </CardContent>
      <div className="orderMsg">{orderMsg}</div>
      <Divider />
      <CardActions sx={{ justifyContent: "center" }}>
        <Button size="small" onClick={handleReviewClick} style={{}}>Review Order</Button>

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
          assetData={props.assetData}
          userid={props.userid}
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
          assetData={props.assetData}
          userid={props.userid}
        />)
      ) : (null)}

    </>
  )
}

export default orderCard