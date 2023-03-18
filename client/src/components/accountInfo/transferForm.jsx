import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, Grid, Box, Slider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Logo from '../../img/logo.png';




function TransferForm() {

    const [page, setPage] = useState(1);
    const [inputValue, setInputValue] = useState(1000)

    const navigate = useNavigate();

    const handleBack = () => {
        if (page === 1 || page === 4) {
            navigate('/AccountInfo');
        } else {
            setPage(page - 1);
        }
    };


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



    const FirstPage = () => (
        <Box display="flex" flexDirection="column" sx={style.gridCard}>
            <Typography variant="h2" sx={style.headerText}> Lets get some Info, {userInfo.firstName} </Typography>

            <Grid sx={{ marginBottom: "30px" }} container spacing={2}>
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
            <Button onClick={() => setPage(page + 1)} variant="contained" color="primary">Connect to Bank Account</Button>
        </Box>
    )

    const changeValue = async ( _, value) => {
        setInputValue(value);
      };

    const SecondPage = () => (
        <Box display="flex" flexDirection="column" sx={style.gridCard}>
            <Typography variant="h2" sx={style.headerText}> How much would you like to invest? </Typography>
            <Typography variant="h3" inline="true">${inputValue}</Typography>
            {inputValue === 1000 ? <Typography variant="body1" inline="true">(recommended)</Typography> : ''}
           <Slider defaultValue={1000} aria-label="Default" valueLabelDisplay="auto" step={10} min={10} max={1000}  onChange={changeValue}/>
           <Button onClick={() => setPage(page + 1)} variant="contained" color="primary">Next</Button>
        </Box>
    )

    

    const ThirdPage = () => (
        <Box display="flex" flexDirection="column" sx={style.gridCard}>
                <Typography variant="h2" sx={style.headerText}> Are you sure? </Typography>
                <Typography variant="body2" >You are about to transfer ${inputValue} from your linked bank account ending in 2983. Are you sure you want to proceed?</Typography>
                <Box display="flex" flexDirection="column">
                <Button onClick={() => setPage(page + 1)} variant="outlined" color="primary">Cancel</Button>
                <Button onClick={() => setPage(page + 1)} variant="outlined" color="primary">Next</Button>
        </Box>
        </Box>
    )

    let currentPage = (
        <>
            {page === 1 ? (
                <FirstPage />
            ) : page === 2 ? (
                <SecondPage />
            ) : page === 3 ? (
                <ThirdPage />
            ) : <FirstPage />}
        </>
    )

    return (
        <Box sx={style.parentGrid}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                    <Box sx={{ flexGrow: 1 }}>
                        <IconButton onClick={handleBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Box>
                    {currentPage}
                </Grid>
                <Grid sx={style.background} item xs={6} sm={6}>
                    <Grid sx={{ float: "right" }} item xs={6} sm={6}>
                        <Link to="/">
                            <Button>
                                Black version of logo here</Button>
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




