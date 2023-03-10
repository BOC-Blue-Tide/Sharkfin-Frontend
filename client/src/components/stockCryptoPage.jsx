import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const stockCryptoPage = (props) => {

  const fallback = 'Data unavailable'
  var stockObj = props.stockObj || fallback


  return (
    <>
      {props.stockObj ?
        <div className="page-container">
          <Stack direction="row" spacing={1}>
            <Chip label={`${stockObj.Sector}`} variant="outlined" />
          </Stack>
          <div className="stock-name">{stockObj.Name}</div>
          <div className="live-price">live price</div>
          <div className="today-change">{`change (change percentage) Today`}</div>
          <div className="after-change">{`change (change percentage) After hours`}</div>

          <div></div>

        </div> : null}
    </>


  )

}
export default stockCryptoPage