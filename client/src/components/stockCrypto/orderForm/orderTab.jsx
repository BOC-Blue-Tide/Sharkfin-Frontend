import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import OrderCard from './orderCard.jsx'



const Order = (props) => {
  const TabPanel = (PropTypes) => {
    const { children, value, index, ...other } = PropTypes;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', border: 1, p: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="BUY" {...a11yProps(0)} />
          <Tab label="SELL" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <OrderCard
          pageType={props.pageType}
          handleOrderClick={props.handleOrderClick}
          value={value}
          stockObj={props.stockObj}
          barData={props.barData}
          coinMeta={props.coinMeta}
          coinBarData={props.coinBarData}
          coinToday={props.coinToday}
          coinPrevious={props.coinPrevious} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrderCard
          pageType={props.pageType}
          handleOrderClick={props.handleOrderClick}
          value={value}
          stockObj={props.stockObj}
          barData={props.barData}
          coinMeta={props.coinMeta}
          coinBarData={props.coinBarData}
          coinToday={props.coinToday}
          coinPrevious={props.coinPrevious} />
      </TabPanel>
    </Box>
  );

}



export default Order