import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Typography,
    IconButton,
    Grid,
    Box,
    Slider,
    FormControl,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Graphic from '../../../dist/sharkfin-graphic.png';
import Logo from '../../../dist/logo-dark.png';
import BankSearch from './bankSearch.jsx';
import axios from 'axios';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// let userInfo = {
//     firstName: 'Daniel',
//     lastName: 'Halper',
//     userName: 'Dhalper',
//     email: 'Dhalper@test.org',
// };

const style = {
    gridCard: {
        width: '100%',
        height: '100%',
        borderRadius: '30px',
        padding: '5% 10% 10% 10%',
    },
    parentGrid: {
        height: '100vh',
    },
    headerText: {
        color: 'primary',
        margin: '20px 0px',
    },
    background: {
        height: '100vh',
        background: 'linear-gradient(180deg, #FFD300 0%, #FFE879 100%)',
    },
};



function TransferForm(props) {
    console.log('TRANSFER FORM PROPS:', props);
    const location = useLocation();
    const propsData = location.state || {};
    const [page, setPage] = useState(propsData.page || 1);
    const [accountNumber, setAccountNumber] = useState(props.userInfo.account_number);
    const [routingNumber, setRoutingNumber] = useState(0);
    const [swiftCode, setSwiftCode] = useState("");
    const [bank, setBank] = useState("");
    const [transferAmount, setTransferAmount] = useState(1000);
    const [errors, setErrors] = useState({
        accountNumber: false,
        routingNumber: false,
        swiftCode: false,
    });
    const [helperTexts, setHelperTexts] = useState({
        accountNumber: "",
        routingNumber: "",
        swiftCode: "",
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const navigate = useNavigate();

    const handleBack = () => {
        if (page === 1 || !accountNumber) {
            navigate('/AccountInfo');
        } else {
            setPage(page - 1);
        }
    };

    const handleBankSubmit = () => {
        let bankInfo = {
            bank: bank,
            account_number: accountNumber
        }
        axios.post(`http://${SERVER_URL}/users/${props.userInfo.user_id}/update/bank`, bankInfo)
        .then((result) => {
            console.log(result);
            props.getUserInfo();
            setPage(page + 1);
        })
        .catch((err) => {
            console.log('Something went wrong...', err);
        })
    };

    const handleTransferSubmit = () => {
        let data = {
            user_id: props.userInfo.user_id,
            amount: transferAmount,
            transaction_type: 'bank'
        }
        axios.post(`http://${SERVER_URL}/finances`, data)
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        })
        console.log( 'Transfer Amount', transferAmount);
        setPage(page + 1)
    };

    useEffect(() => {
        setIsButtonDisabled(
            routingNumber === 0 ||
            accountNumber === 0 ||
            swiftCode === "" ||
            errors.routingNumber ||
            errors.accountNumber ||
            errors.swiftCode
        );
    }, [routingNumber, accountNumber, swiftCode, errors]);


    const validateAccountNumber = (value) => {
        if (value.length < 8 || value.length > 12) {
            setErrors((prevErrors) => ({ ...prevErrors, accountNumber: true }));
            setHelperTexts((prevHelperTexts) => ({
                ...prevHelperTexts,
                accountNumber: "Account number should be between 8 and 12 digits",
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, accountNumber: false }));
            setHelperTexts((prevHelperTexts) => ({
                ...prevHelperTexts,
                accountNumber: "",
            }));
        }
    };

    const validateRoutingNumber = (value) => {
        if (value.length !== 9) {
            setErrors((prevErrors) => ({ ...prevErrors, routingNumber: true }));
            setHelperTexts((prevHelperTexts) => ({
                ...prevHelperTexts,
                routingNumber: "Routing number should be 9 digits",
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, routingNumber: false }));
            setHelperTexts((prevHelperTexts) => ({
                ...prevHelperTexts,
                routingNumber: "",
            }));
        }
    };

    const validateSwiftCode = (value) => {
        const regex = /^[A-Za-z]{6}[A-Za-z\d]{2}(\d{3})?$/;
        if (!regex.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, swiftCode: true }));
            setHelperTexts((prevHelperTexts) => ({
                ...prevHelperTexts,
                swiftCode: "Invalid SWIFT code",
            }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, swiftCode: false }));
            setHelperTexts((prevHelperTexts) => ({
                ...prevHelperTexts,
                swiftCode: "",
            }));
        }
    };

    const handleBankInput = (input) => {
        setBank(input);
    }

    let mockDatabaseAccountNumber = 1234;

    const accountNumberTrimmer = () => {
        if (accountNumber) {
            return accountNumber.slice(-4);
        } else {
            return mockDatabaseAccountNumber.toString().slice(-4);
        }
    }

const OnboardingSlide = () => {
  const [displayStep, setDisplayStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setDisplayStep(1), 1000);
    const timer2 = setTimeout(() => setDisplayStep(2), 2000);
    const timer3 = setTimeout(() => setDisplayStep(3), 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const stepStyle = {
    // background: 'linear-gradient(to right, #FFE879 0%, #FFD300 100%)',
    borderRadius: '5px',
    padding: '5px',
    marginBottom: '8px',
    fontWeight: 'light',
    // boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'left',
        padding: 2,
      }}
    >
      <Typography variant="h2" component="h2" gutterBottom>
        You're in!
      </Typography>
      <Typography variant="h4" component="p" gutterBottom>
        Now, let's go over some ground rules...
      </Typography>
      {displayStep >= 1 && (
        <Typography variant="body1" component="p" gutterBottom sx={stepStyle}>
          1. Invest up to $1,000 of real cash into the stock market!
        </Typography>
      )}
      {displayStep >= 2 && (
        <Typography variant="body1" component="p" gutterBottom sx={stepStyle}>
          2. Compete for the highest quarterly returns against other players.
        </Typography>
      )}
      {displayStep >= 3 && (
        <Typography variant="body1" component="p" gutterBottom sx={stepStyle}>
          3. Cash out your gains at the end of the competition.
        </Typography>
      )}
      <Button variant="contained" onClick={() => setPage(1)}>Get started</Button>
    </Box>
  );
};
    const firstPage = () => {
        return (
            <Box key="firstPage" display="flex" flexDirection="column" sx={style.gridCard}>
                <Typography variant="h2" sx={style.headerText}>
                    Let's get some info, {props.userInfo.firstname}
                </Typography>

                <Grid sx={{ marginBottom: '30px' }} container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            id="first-name-input-1"
                            label="Legal First Name"
                            defaultValue={props.userInfo.firstname}
                        />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <TextField
                            id="last-name-input-2"
                            label="Legal Last Name"
                            defaultValue={props.userInfo.lastname}
                        />
                    </Grid>
                </Grid>
                <BankSearch handleBankInput={handleBankInput}/>
                <TextField
                    key="bank-account"
                    id="bank-account"
                    label="Bank Account Number"
                    error={errors.accountNumber}
                    helperText={helperTexts.accountNumber}
                    onBlur={(event) => validateAccountNumber(event.target.value)}
                    onChange={(event) => {
                        setAccountNumber(event.target.value);
                    }}
                />
                <TextField
                    id="username-input-4"
                    label="Routing Number"
                    error={errors.routingNumber}
                    helperText={helperTexts.routingNumber}
                    onBlur={(event) => validateRoutingNumber(event.target.value)}
                    onChange={(event) => {
                        setRoutingNumber(event.target.value);
                    }}
                />
                <TextField
                    id="Swift-code"
                    label="Swift code"
                    error={errors.swiftCode}
                    helperText={helperTexts.swiftCode}
                    onBlur={(event) => validateSwiftCode(event.target.value)}
                    onChange={(event) => {
                        setSwiftCode(event.target.value);
                    }}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Account type</FormLabel>
                    <RadioGroup
                        row
                        aria-label="options"
                        name="options"
                        defaultValue="Savings"
                    >
                        <FormControlLabel value="Checkings" control={<Radio />} label="Checkings" />
                        <FormControlLabel value="Savings" control={<Radio />} label="Savings" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                <Button disabled={isButtonDisabled} onClick={handleBankSubmit} variant="contained" color="primary">
                    Connect to Bank Account
                </Button>
            </Box>
        )
    };

    const SecondPage = () => (
        <Box display="flex" flexDirection="column" sx={style.gridCard}>
            <Typography variant="h2" sx={style.headerText}>
                How much would you like to transfer?
            </Typography>
            <Box sx={{ display: 'inline' }}>
                <Typography sx={{ display: 'inline' }} variant="h3">${transferAmount}</Typography>
                {transferAmount === 1000 ? (
                    <Typography sx={{ display: 'inline' }} variant="body1">  (recommended)</Typography>
                ) : (
                    ''
                )}
            </Box>
            <Slider
                defaultValue={1000}
                value={transferAmount}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={100}
                step={10}
                max={1000}
                onChangeCommitted={(_, newValue) => setTransferAmount(newValue)}
            />
            <Button
                onClick={() => setPage(page + 1)}
                variant="contained"
                color="primary"
            >
                Next
            </Button>
        </Box>
    );

    const ThirdPage = () => (
        <Box display="flex" flexDirection="column" sx={style.gridCard}>
            <Typography variant="h2" sx={style.headerText}> Are you sure? </Typography>
            <Typography variant="body2" >You are about to transfer <Box fontWeight='bold' display='inline'>${transferAmount}</Box> from your linked bank account ending in  <Box fontWeight='bold' display='inline'>{accountNumberTrimmer(accountNumber)}</Box>. Are you sure you want to proceed?</Typography>
            <Box display="flex" flexDirection="row">
            <Link to="/AccountInfo" ><Button variant="outlined" color="primary">Cancel</Button></Link>
                <Link to="/AccountInfo" ><Button onClick={handleTransferSubmit} variant="outlined" color="primary">Confirm</Button></Link>
            </Box>
        </Box>
    )

    let currentPage = (
        <>
            { page === -1 ? (
                <OnboardingSlide/>
            ) : page === 1 ? (
                firstPage()
            ) : page === 2 ? (
                <SecondPage />
            ) : page === 3 ? (
                <ThirdPage />
            ) : firstPage()
            }
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
                        <img src={Logo} alt="SharkFin Trading" height="50" />                        </Link>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                    </Grid>
                    <Box sx={{ width:'100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={Graphic} alt="SharkFin Trading" style={{ marginTop: '-100px' }} width="100%" />
</Box>
</Grid>
            </Grid>
        </Box>
    );
}

export default TransferForm;

