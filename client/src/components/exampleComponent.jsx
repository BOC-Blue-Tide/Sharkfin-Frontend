import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function Dashboard() {

    const [count, setCount] = useState(0);

  return (
    <>
  <Link to="/accountInfo">
    <Button variant="contained" color="primary">
        Go to account info    
    </Button>
    </Link>
    </>
  );
}

export default Dashboard;