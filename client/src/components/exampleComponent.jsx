import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


function Dashboard() {

    const [count, setCount] = useState(0);

  return (
    <>
    <Button variant="contained" color="primary" onClick={() => setCount(count + 1)}>
    Hello World ({count})
  </Button>
  <Link to="/accountInfo">
    <Button variant="contained" color="primary">
        Go to account info    
    </Button>
    </Link>
    </>
  );
}

export default Dashboard;