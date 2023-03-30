import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import helpers from '../helperFunctions/calculateEstimate.js'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const cryptoReviewOrder = (props) => {

  const coinMeta = props.coinMeta
  const coinBarData = props.coinBarData
  const [open, setOpen] = useState(true);
  const [orderType, setOrderType] = useState('')
  const [estimate, setEstimate] = useState('')
  const [equity, setEquity] = useState({})
  const [availBalance, setAvailBalance] = useState('')
  const [userid, setUserid] = useState(null)
  const [remaining, setRemaining] = useState(null)
  const [holding, setHolding] = useState(null)

  useEffect(() => {
    if (props.value === 0) {
      setOrderType('buy')
    } else if (props.value === 1) {
      setOrderType('sell')
    }
  }, [props.value])

  useEffect(() => {
    (async () => {
      if (typeof estimate !== 'string' && orderType.length > 0) {
        let remaining = await helpers.calculateRemaining(props.orderIn, props.orderInput.amount, availBalance, estimate, orderType, holding)
        setRemaining(remaining)
      }
    })()

  }, [estimate, orderType])


  useEffect(() => {
    if (props.userid && props.userid !== 0) {
      setUserid(props.userid)
    }
  }, [props.userid])


  useEffect(() => {
    if (props.assetData.availBalance) {
      setAvailBalance(props.assetData.availBalance)
    }
  }, [props.assetData.availBalance])

  useEffect(() => {
    (async () => {
      const obj = {}
      let estimate = await helpers.calculateEstimate(props.orderIn, props.orderInput.amount, props.coinBarData[props.coinBarData.length - 1].c)
      if (props.value === 0 && props.orderIn === 'dollars') {
        // a reduction to user buying power
        // an addition to user's equity
        obj.buyingPower = Number(props.orderInput.amount) * -1
        obj.holding = estimate
        setEquity(obj)
      } else if (props.value === 1 && props.orderIn === 'dollars') {
        //sell
        obj.buyingPower = Number(props.orderInput.amount)
        obj.holding = estimate * -1
        setEquity(obj)
      }
      else if (props.value === 0 && props.orderIn === 'coins') {
        //buy
        obj.buyingPower = estimate * -1
        obj.holding = Number(props.orderInput.amount)
        setEquity(obj)
      }
      else if (props.value === 1 && props.orderIn === 'coins') {
        //sell
        obj.buyingPower = estimate
        obj.holding = Number(props.orderInput.amount) * -1
        setEquity(obj)
      }
      setEstimate(estimate)

    })()

  }, [props.orderIn])


  const handleClose = () => {
    setOpen(false)
    props.handleReviewClick(false)
  }

  const handleSubmit = () => {
    let datetime = new Date
    datetime = datetime.toUTCString()
    const orderObj = props.orderInput
    orderObj.orderType = orderType
    orderObj.account = userid
    orderObj.symbol = coinMeta[0].symbol
    orderObj.company = coinMeta[0].name
    orderObj.orderIn = props.orderInput.orderIn
    orderObj.amount = props.orderInput.amount
    orderObj.price = props.coinBarData[props.coinBarData.length - 1].c
    orderObj.datetime = datetime
    orderObj.equity = equity
    orderObj.newRemaining = remaining
    console.log(orderObj)
    props.handleOrderClick(orderObj)
  }
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Review Order
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <span>Available Fund: </span>
            <span>{`$${availBalance}`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Current Holding: </span>
            <span>{`${holding} shares`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Symbol: </span>
            <span>{coinMeta[0].symbol}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Currency:  </span>
            <span>{coinMeta[0].name}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            {props.value === 0 ? <span>Buy In:  </span> : <span>Sell In:  </span>}
            <span>{props.orderInput.orderIn}</span>
          </Stack>

          <Stack direction="row" spacing={1}>
            <span>Quantity:  </span>
            <span>{`${props.orderInput.amount} ${props.orderInput.orderIn}`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Market Price:  </span>
            <span>{`$${props.coinBarData[props.coinBarData.length - 1].c}`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            {props.orderIn === "coins" ?
              <>
                {props.value === 0 ? <span>Estimated Cost:  </span> : <span>Estimated Gain:  </span>}

                <span>{`$${parseFloat(estimate).toFixed(2)} dollars`}</span>
              </> : null}

            {props.orderIn === "dollars" ?
              <>
                {props.value === 0 ? <span>Estimated amount of coin buying:  </span> : <span>Estimated amount of coin selling:  </span>}

                <span>{`${parseFloat(estimate).toFixed(3)} coins`}</span>
              </> : null}
          </Stack>

          <Stack direction="row" spacing={1}>
            {remaining !== null ?
              <>
                <span>New Buying Power:  </span>
                <span>{`$${parseFloat(remaining.buyPower).toFixed(2)}`}</span>
                <span>New Holding:  </span>
                <span>{`${parseFloat(remaining.holding).toFixed(3)}`}</span> </> : null}
          </Stack>

        </Stack>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Box>
    </Modal>

  )

}

export default cryptoReviewOrder