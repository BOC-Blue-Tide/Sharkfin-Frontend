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

const reviewOrder = (props) => {

  const stockObj = props.stockObj
  const [open, setOpen] = useState(true);
  const [orderType, setOrderType] = useState('')
  const [estimate, setEstimate] = useState('')
  const [equity, setEquity] = useState({})

  useEffect(() => {
    if (props.value === 0) {
      setOrderType('buy')
    } else if (props.value === 1) {
      setOrderType('sell')
    }
  }, [props.value])

  useEffect(() => {
    (async () => {
      const obj = {}
      let estimate = await helpers.calculateEstimate(props.orderIn, props.value, props.orderInput.amount, props.barData[props.barData.length - 1].c)
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
      else if (props.value === 0 && props.orderIn === 'shares') {
        //buy
        obj.buyingPower = estimate * -1
        obj.holding = Number(props.orderInput.amount)
        setEquity(obj)
      }
      else if (props.value === 1 && props.orderIn === 'shares') {
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
    const orderObj = props.orderInput
    orderObj.orderType = orderType
    orderObj.account = '12345678'
    orderObj.symbol = stockObj.Symbol
    orderObj.company = stockObj.Name
    orderObj.orderIn = props.orderInput.orderIn
    orderObj.amount = props.orderInput.amount
    orderObj.price = props.barData[props.barData.length - 1].c
    orderObj.equity = equity
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
            <span>Account: </span>
            <span>12345678</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Symbol: </span>
            <span>{stockObj.Symbol}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Company:  </span>
            <span>{stockObj.Name}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            {props.value === 0 ? <span>Buy In:  </span> : <span>Sell In:  </span>}
            <span>{props.orderInput.orderIn}</span>
          </Stack>

          <Stack direction="row" spacing={1}>
            {props.orderInput.orderIn === 'dollars' ? <span>Amount:  </span> : <span>Quantity:  </span>}
            <span>{`${props.orderInput.amount} ${props.orderInput.orderIn}`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Market Price:  </span>
            <span>{`$${props.barData[props.barData.length - 1].c}`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            {props.orderIn === "shares" ?
              <>
                {props.value === 0 ? <span>Estimated Cost:  </span> : <span>Estimated Gain:  </span>}

                <span>{`$${parseFloat(estimate).toFixed(2)} dollars`}</span>
              </> : null}

            {props.orderIn === "dollars" ?
              <>
                {props.value === 0 ? <span>Estimated number of shares buying:  </span> : <span>Estimated number of shares selling:  </span>}

                <span>{`${estimate} shares`}</span>
              </> : null}

          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Remaining Buying Power:  </span>
            <span>$1</span>
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

export default reviewOrder