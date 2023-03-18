import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton } from '@mui/material';
import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from '../../img/logo.png';




function TransferForm() {

    let userInfo = {
        firstName: "Daniel",
        lastName: "Halper",
        userName: "Dhalper",
        email: "Dhalper@test.org",
    }

    const style = {
        gridCard: {
            width: "100%",
            height: "100%",
            borderRadius: "30px",
            padding: "5% 10% 10% 10%"
        },
        parentGrid: {
            height: "100vh"

        },
        headerText: {
            color: "primary",
            margin: "20px 0px"
        },
        background: {
            height: "100vh",
            background: "linear-gradient(180deg, #FFD300 0%, #FFE879 100%)"
        }
    }


    return (
        <Box sx={style.parentGrid}>

            <Grid container spacing={2}>

                <Grid item xs={6} sm={6}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to="/AccountInfo">
                            <IconButton>
                                <ArrowBackIcon />
                            </IconButton>
                        </Link>
                    </Box>
                    <Box display="flex" flexDirection="column" sx={style.gridCard}>
                        <Typography variant="h4" sx={style.headerText}> Lets get some Info, Daniel </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    id="first-name-input-1"
                                    label="Legal First Name"
                                    placeholder={userInfo.firstName}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    id="last-name-input-2"
                                    label="Legal Last Name"
                                    placeholder={userInfo.lastName}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    id="back-account"
                                    label="Bank Account Number"
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    id="username-input-4"
                                    label="Routing Number"
                                />
                            </Grid>
                        </Grid>

                        <Button variant="contained" color="primary">Connect to Bank Account</Button>
                    </Box>
                </Grid>
                <Grid sx={style.background} item xs={6} sm={6}>
                    <Grid sx={{ float: "right" }} item xs={6} sm={6}>
                        <Link to="/">
                            <Button>Black version of logo here</Button>
                            {/* <Logo/> */}
                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        IMAGE HERE
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TransferForm;




