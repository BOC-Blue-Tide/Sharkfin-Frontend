import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';



function AccountInfo() {
   const [count, setCount] = useState(0);

   let userInfo = {
      firstName: "Daniel",
      lastName: "Halper",
      userName: "Dhalper",
      email: "Dhalper@test.org",
   }

   const style = {
      gridCard: {
         backgroundColor: "#F6F6F6",
         width: "100%",
         height: "100%",
         borderRadius: "30px",
         padding: "5% 10% 10% 10%"
      },
      parentGrid: {
         minHeight: "600px",
         margin: "40px 40px 40px 0px",
         height: "600px"
      },
      headerText: {
         color: "primary",
         margin: "20px 0px"
      }
   }

   return (
      <Grid container sx={style.parentGrid} spacing={2}>
         <Grid item xs={6} sm={6}>
            <h1>Account Information</h1>
            <Typography sx={style.headerText} variant="h4">You have no funds! Connect your bank account to get started...</Typography>
            <Link to="/">
               <Button disabled variant="contained" color="primary">
                  Transfer money to Sharkfin
               </Button>
            </Link>
         </Grid>
         <Grid item xs={6} sm={6}>
            <Box display="flex" flexDirection="column" sx={style.gridCard}>
               <Typography variant="h4" sx={style.headerText}> User Information </Typography>

               <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                     <TextField
                        id="first-name-input-1"
                        label="First Name"
                        placeholder={userInfo.firstName}
                        disabled
                        InputLabelProps={{ shrink: true }}
                     />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                     <TextField
                        id="last-name-input-2"
                        label="Last Name"
                        placeholder={userInfo.lastName}
                        disabled
                        InputLabelProps={{ shrink: true }}
                     />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                     <TextField
                        id="email-input"
                        label="Email"
                        placeholder={userInfo.email}
                        disabled
                        InputLabelProps={{ shrink: true }}
                     />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                     <TextField
                        id="username-input-4"
                        label="Username"
                        placeholder={userInfo.userName}
                        disabled
                        InputLabelProps={{ shrink: true }}
                     />
                  </Grid>
               </Grid>
               <Typography variant="h4" sx={style.headerText}> Billing Information </Typography>
               <Typography variant="p1" sx={{ marginBottom: "20px" }}> We don’t have any banking information for your account. Connect your account and start investing!
               </Typography>
               <Link to="/transferForm" >
                  <Button variant="contained" color="primary">Get Started</Button>
               </Link>
            </Box>
         </Grid>
      </Grid>
   );
}

export default AccountInfo;




