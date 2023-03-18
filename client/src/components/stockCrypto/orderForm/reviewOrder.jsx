import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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


  const handleClose = () => {
    setOpen(false)
    props.handleReviewClick(false)
  }

  const handleSubmit = () => {
    const orderObj = props.orderInput
    orderObj.account = '12345678'
    orderObj.symbol = stockObj.Symbol
    orderObj.company = stockObj.Name
    orderObj.buyType = props.orderInput.buyType
    orderObj.amount = props.orderInput.amount
    orderObj.price = props.barData[props.barData.length - 1].c
    orderObj.cost = Number(props.orderInput.amount) * props.barData[props.barData.length - 1].c
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
            <span>{props.orderInput.buyType}</span>
          </Stack>

          <Stack direction="row" spacing={1}>
            <span>Quantity:  </span>
            <span>{`${props.orderInput.amount} ${props.orderInput.buyType}`}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            <span>Market Price:  </span>
            <span>{props.barData[props.barData.length - 1].c}</span>
          </Stack>
          <Stack direction="row" spacing={1}>
            {props.value === 0 ? <span>Estimated Cost:  </span> : <span>Estimated Gain:  </span>}

            <span>{Number(props.orderInput.amount) * props.barData[props.barData.length - 1].c}</span>
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