import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Tooltip } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import ProfilePic from '../../../dist/mockProfile.png';
import axios from 'axios';

function AccountInfo(props) {

   const [edit, setEdit] = useState(false);

   let remainingFunds = 400;

   const [userInfo, setUserInfo] = useState({
      userId: props.userInfo?.userId || 1,
      firstName: props.userInfo?.firstName || 'FirstName',
      lastName: props.userInfo?.lastName || 'LastName',
      email: props.userInfo?.email || 'Email',
      userName: props.userInfo?.userName || 'Username',
      profilePic: props.userInfo?.profilePic || ProfilePic,
      bank: props.userInfo?.bank,
      account_number: props.userInfo?.accountNumber,
    });
  

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

   const handleSubmit = async (event) => {
      event.preventDefault();
    
      // Create a new FormData object
      const formData = new FormData();
      console.log('userInfo', userInfo)
      // Append the user information and image file to the FormData object
      formData.append('userInfo', JSON.stringify(userInfo));
      formData.append('profilePic', userInfo.profilePic);
      for (let pair of formData.entries()) {
         console.log(pair[0] + ', ' + pair[1]);
      }
      console.log('data', formData);
      try {
        // Send an axios post request with the FormData object
        const response = await axios.post('/updateUserInfo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('User info updated:', response);
        props.updateUserInfo(response);
      } catch (error) {
        console.error('Error updating user info:', error);
      }
    };

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUserInfo({ ...userInfo, [name]: value });
    };

   //  handle the file input change event
   const handleFileInputChange = (e) => {
      setUserInfo({...userInfo, profilePic: e.target.files[0]});
   };

   //  handle the click event on the Avatar
   const handleAvatarClick = () => {
      document.getElementById("profile-picture-input").click();
   };

   return (
      <form onSubmit={handleSubmit}>

      <Box sx={style.parentGrid}>
         <Box>
            <h1>Account Information</h1>

            {userInfo.accountNumber ? <><Typography sx={style.headerText} variant="h4">Your account is funded! Woo hoo! 🎉</Typography>
               <Typography sx={style.headerText} variant="body1">You have ${remainingFunds} available funds for trading.</Typography>

               <Link state={{ page: -1 }} to="/transferForm">
                  <Button variant="contained" color="primary">
                     Demo
                  </Button>
               </Link>
               <Link state={{ page: 2 }} to="/transferForm">
                  <Button variant="contained" color="primary">
                     Transfer to Sharkfin
                  </Button>
               </Link>
               {/* <Tooltip label="Withdraw disabled until ">
               <Button disabled variant="outlined" color="primary">
                  Withdraw Remaining Funds
               </Button>
               </Tooltip> */}
            </> :
               <>
                  <Typography sx={style.headerText} variant="h4">You have no funds! Connect your bank account to get started...</Typography>
                  <Link to="/">
                     <Button disabled variant="contained" color="primary">
                        Transfer money to Sharkfin
                     </Button>
                  </Link>
                  <Link state={{ page: -1 }} to="/transferForm">
                  <Button variant="contained" color="primary">
                     Demo
                  </Button>
               </Link>
               </>
            }
         </Box>
         <Box display="flex" flexDirection="column" sx={style.gridCard}>
         <Box display="flex" flexDirection="row"  alignItems="center" justifyContent="space-between" >
            <Typography variant="h4" sx={style.headerText}> User Information </Typography>
            <Button variant={!edit? "outlined" : "contained"} onClick={edit? () => setEdit(false) : () => setEdit(true)}  type={edit? "submit": ''} color="primary">{edit? "Save": "Edit"}</Button>
            </Box>
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
                  {/* Add Tooltip component */}
                  <Tooltip title={edit? "Change your profile picture": "Visible to other users"} arrow>
                     {/* Add onClick event to the Avatar */}
                     <div sx={style.profilePicContainer} onClick={edit? handleAvatarClick: null}>
                        <Avatar sx={style.profilePic} alt="Profile picture" src={ProfilePic} />
                     </div>
                  </Tooltip>
                  {/* Add hidden input for file selection */}
                  <input
                     type="file"
                     id="profile-picture-input"
                     onChange={handleFileInputChange}
                     accept="image/*"
                     hidden
                  />
               </Box>
               <Box wrap='nowrap' gridColumn="3 / 8" gridRow="1">
                  <TextField
                     wrap='nowrap'
                     id="first-name-input-1"
                     label="First Name"
                     name="firstName"
                     defaultValue={userInfo.firstName}
                     onChange={handleInputChange}
                     variant="standard"
                     disabled = {!edit}
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%',
                        marginRight: "4%"
                     }}
                  />
                  <TextField
                     wrap='nowrap'
                     id="last-name-input-2"
                     label="Last Name"
                     defaultValue={userInfo.lastName}
                     name="lastName"
                     onChange={handleInputChange}
                     variant="standard"
                     disabled = {!edit}
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
                     defaultValue={userInfo.email}
                     variant="standard"
                     wrap='nowrap'
                     disabled
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%',
                        marginRight: "4%"
                     }}
                  />
                  <TextField
                     id="username-input-4"
                     label="Username"
                     name="username"
                     defaultValue={userInfo.userName}
                     onChange={handleInputChange}
                     variant="standard"
                     wrap='nowrap'
                     disabled = {!edit}
                     InputLabelProps={{ shrink: true }}
                     sx={{
                        width: '40%'
                     }}
                  />
               </Box>
            </Box>
            <Typography variant="h4" sx={style.headerText}> Billing Information </Typography>
            {(userInfo.accountNumber ?
               <>
                  <Typography variant="p1" sx={{ marginBottom: "20px" }}> Your Sharkfin account is currently linked to a <Box sx={{ fontWeight: "bold", display: "inline" }}>{userInfo.bank}</Box> account ending in <Box sx={{ fontWeight: "bold", display: "inline" }}>{userInfo.accountNumber}</Box>
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
      </form>
   );
}

export default AccountInfo;