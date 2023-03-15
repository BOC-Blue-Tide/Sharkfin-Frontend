import React, { useState } from 'react';
import { Button, Input } from '@mui/material';
import { Grid, Card } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { width } from '@mui/system';



const style = {
   gridCard: {
      margin: "40px",
      backgroundColor: "lightGray",
      width: "100%",
      height: "100%"
   }
}
            // <div sx={style.layout}>


function AccountInfo() {
     const [count, setCount] = useState(0);

        return (
            <Grid container spacing={2}>
               <Grid item xs={6} sm={6}>
                  <h1>Account Information</h1>
                  <h4>You have no funds! Connect your bank account to get started...</h4>
                <Link to="/">
                <Button variant="contained" color="primary">
                   Go Home
                </Button>
                </Link>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Card sx={style.gridCard}>
                <Input>Some content here</Input>
                </Card>
                </Grid>
             </Grid>
        );
}

export default AccountInfo;