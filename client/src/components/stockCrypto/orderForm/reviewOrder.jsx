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

  const [open, setOpen] = useState(true);


  const handleClose = () => {
    setOpen(false)
    props.handleReviewClick(false)
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

        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined">Submit</Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default reviewOrder