import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ProfilePic from '../../../dist/mockProfile.png'; // Replace with your profile picture

function AccountInfo() {

   let mockDatabaseAccountNumber = 1234;

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
         padding: "5% 10% 10% 10%",
      },
      parentGrid: {
         minHeight: "600px",
         margin: "40px 40px 40px 0px",
         height: "600px",
         display: 'grid',
         gridTemplateColumns: '1fr 1fr',
         gap: 2,
      },
      headerText: {
         color: "primary",
         margin: "20px 0px",
      },
      profilePicContainer: {
         width: "100%",
         height: "100%",
         borderRadius: "50%",
         overflow: "hidden",
         marginLeft: "auto",
      },
      profilePic: {
         width: "100%",
         height: "100%",
         objectFit: "cover",
      },
   };

   return (
      <Box sx={style.parentGrid}>
         <Box>
            <h1>Account Information</h1>

            {mockDatabaseAccountNumber ? <><Typography sx={style.headerText} variant="h4">Your account is funded! Woo hoo! 🎉</Typography>
               <Link state={{page: 2}} to="/transferForm">
                  <Button variant="contained" color="primary">
                     Transfer money to Sharkfin
                  </Button>
               </Link> 
               </> :
               <>
                  <Typography sx={style.headerText} variant="h4">You have no funds! Connect your bank account to get started...</Typography>
                  <Link to="/">
                     <Button disabled variant="contained" color="primary">
                        Transfer money to Sharkfin
                     </Button>
                  </Link>
               </>
            }
         </Box>
         <Box display="flex" flexDirection="column" sx={style.gridCard}>
            <Typography variant="h4" sx={style.headerText}> User Information </Typography>

            <Box
               sx={{
                  display: 'grid',
                  gridAutoFlow: 'row',
                  gridTemplateColumns: 'repeat(7, 1fr)',
                  gridTemplateRows: 'repeat(2, auto)',
                  gridColumnGap: "5%",
                  marginLeft: '-15px'
               }}
            >
               <Box gridColumn="1 / 3" gridRow="1 / 3">
                  <div sx={style.profilePicContainer}>
                     <Avatar sx={style.profilePic} alt="Profile picture" src={ProfilePic} />
                  </div>
               </Box>
               <Box wrap='nowrap' gridColumn="3 / 8" gridRow="1">
                  <TextField
                     wrap='nowrap'
                     id="first-name-input-1"
                     label="First Name"
                     placeholder={userInfo.firstName}
                     variant="standard"
                     disabled
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%',
                        marginRight: "4%"// Adjust the width as desired
                     }}
                  />
                  <TextField
                     wrap='nowrap'
                     id="last-name-input-2"
                     label="Last Name"
                     placeholder={userInfo.lastName}
                     variant="standard"
                     disabled
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%'
                     }}
                  />
               </Box>


               <Box gridColumn="3 / 8" gridRow="2">
                  <TextField
                     id="email-input"
                     label="Email"
                     placeholder={userInfo.email}
                     variant="standard"
                     wrap='nowrap'
                     disabled
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%',
                        marginRight: "4%"// Adjust the width as desired
                     }}
                  />
                  <TextField
                     id="username-input-4"
                     label="Username"
                     placeholder={userInfo.userName}
                     variant="standard"
                     wrap='nowrap'
                     disabled
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%'
                     }}
                  />
               </Box>
            </Box>
            <Typography variant="h4" sx={style.headerText}> Billing Information </Typography>
            {(mockDatabaseAccountNumber ?
               <>
                  <Typography variant="p1" sx={{ marginBottom: "20px" }}> We have Bank information ending in <Box sx={{ fontWeight: "bold", display: "inline" }}>{mockDatabaseAccountNumber}</Box>
                  </Typography>
                  <Link to="/transferForm" >
                     <Button variant="contained" color="primary">Connect to a new Bank account</Button>
                  </Link>
               </>
               : <>
                  <Typography variant="p1" sx={{ marginBottom: "20px" }}> We don’t have any banking information for your account. Connect your account and start investing!
                  </Typography>
                  <Link to="/transferForm" >
                     <Button variant="contained" color="primary">Get Started</Button>
                  </Link>
               </>
            )}
         </Box>
      </Box>
   );
}

export default AccountInfo;





