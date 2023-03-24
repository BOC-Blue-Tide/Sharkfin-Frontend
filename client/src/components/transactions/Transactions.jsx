import React, {useState} from 'react';
import { Accordion } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import { Typography } from '@mui/material';

function Transactions(props) {

  let totalPrice = '$' + (props.data.price * props.data.quantity).toFixed(2) + ' USD';

  let capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let formatDate = function(datestring) {
    let date = new Date(datestring);
    let options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'UTC'
    };
    return date.toLocaleString('en-US', options);
  }

  let outerAccordian = <div className='transaction'>{props.data.stock} <span>{totalPrice}</span></div>

  let innerAccordian = <div>
    <div className='transaction'>Transaction type <span>{capitalizeFirstLetter(props.data.transactiontype)}</span></div>
    <div className='transaction'>Date <span>{formatDate(props.data.datetime)}</span></div>
    <hr></hr>
    <div className='transaction'>Quantity <span>{props.data.quantity}</span></div>
    <div className='transaction'>Price <span>{'$' + props.data.price}</span></div>
    <hr></hr>
    <div className='transaction'>Total Price <span>{totalPrice}</span></div>
    <div className='transaction'>Status <span>{capitalizeFirstLetter(props.data.status)}</span></div>
  </div>;

  return <>
    <Accordion >
      <AccordionSummary expandIcon={<span>{'\u2304'}</span>}>
        <Typography variant='h5' sx={{ width: '75%', flexShrink: 0 }}>
          <div>
            {props.data.stock}
          </div>
          <div style={{'fontSize': 'medium'}}>{formatDate(props.data.datetime)}</div>
        </Typography>
        <Typography variant='h5'>
          <div>
            {totalPrice}
          </div>
          <div style={{'fontSize': 'medium'}}>{capitalizeFirstLetter(props.data.transactiontype)}</div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {innerAccordian}
      </AccordionDetails>
    </Accordion>
  </>
}

export default Transactions;