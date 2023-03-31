import React from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  Box,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import Logo from '../../../dist/logo-dark.png';
import Graphic from '../../../dist/sharkfin-graphic.png';
import jwt_decode from "jwt-decode";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
const axios = require('axios').default;
import { useNavigate } from 'react-router-dom';
import GlobalPadding from "../globalPadding.jsx";

const style = {
  gridCard: {
    width: '100%',
    height: '100%',
    padding: '5% 6% 10% 10%',
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
    padding: '7% 3% 5% 5%'
  },
  googleLoginButton: {
    backgroundColor: '#4285F4',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    textTransform: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
    '&:hover': {
      backgroundColor: '#2B7FF0',
    }
  }
};




const Login = (props) => {
  const navigate = useNavigate()

  const responseMessage = (response) => {
    var decoded = jwt_decode(response.credential);
    //console.log('success', response, decoded);
    axios.post('/login', {
      email: decoded.email,
      credential: response.credential,
    })
      .then((res) => {
        // console.log('res.data',res, res.data);
        var googleInfo = {
          id: res.data.id,
          email: decoded.email,
          username: decoded.name,
          firstname: decoded.given_name,
          lastname: decoded.family_name,
          picture: decoded.picture
        };
        props.updateEmail(googleInfo.email);
        console.log('login succeeds', res.data);
        localStorage.setItem("googleInfo", JSON.stringify(googleInfo));

        props.getUser()
          .then(() => {
            if (res.data.newUser) {
              // navigate(`/transferForm`);
              navigate('/transferForm', { state: { page: -1 }, replace: false });
            }
          })
          .catch((err) => {
            console.log("getUser error", err);
            // navigate(`/transferForm`);
            navigate('/transferForm', { state: { page: -1 }, replace: false });
          })

      })
      .catch((error) => {
        console.log('responseMessage /login fail', error);
      });

  };

  const errorMessage = (error) => {
    console.log('login errorMessage', error);
  };


  return (
    <Box sx={style.parentGrid}>
      <Grid container spacing={2}>

        <Grid item xs={6} sm={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'left',
              padding: '12%'
            }}
          >
            <Typography variant="h3"
              component="h3"
              sx={{
                mb: 2,
                letterSpacing: 1.2,
                textAlign: 'left',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              }}
              gutterBottom
            >
              Welcome to Shark Fin
            </Typography>
            <Typography variant="h6" component="p" sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 6 }} gutterBottom>
              The gamified stock market experience
            </Typography>

            <div>
              <GoogleLogin     sx={style.googleLoginButton}
onSuccess={responseMessage} onError={errorMessage} />
            </div>

          </Box>
        </Grid>

        <Grid sx={style.background} item xs={6} sm={6}>
          <Grid sx={{ float: "right" }} item xs={6} sm={6}>
            <img src={Logo} alt="SharkFin Trading" height="50" />
          </Grid>
          <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={Graphic} alt="SharkFin Trading" style={{ marginTop: '-100px' }} width="100%" />
          </Box>
        </Grid>

      </Grid>

    </Box>
  )
}

export default Login;
