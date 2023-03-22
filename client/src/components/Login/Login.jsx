import React from "react";
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import jwt_decode from "jwt-decode";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
const axios = require('axios').default;

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  responseMessage = (response) => {
    var decoded = jwt_decode(response.credential);
    //console.log('success', response, decoded);
    axios.post('/login', {
      email: decoded.email,
      credential: response.credential,
    })
    .then((response) =>{
      console.log('success', decoded);
      var googleInfo = {
        id: 12345,  // placeholder for user_id
        email: decoded.email,
        username: decoded.name,
        firstname: decoded.given_name,
        lastname: decoded.family_name,
        picture: decoded.picture
      };
      this.props.updateEmail(googleInfo.email);
      localStorage.setItem("googleInfo", JSON.stringify(googleInfo));
    })
    .catch((error) => {
      console.log('fail', error);
    });

};
  errorMessage = (error) => {
    console.log(error);
};

logout = () => {
  axios.post('/logout')
  .then((response) => {
    this.props.updateEmail('');
    localStorage.removeItem("googleInfo");
    console.log('logout success', response);
  })
  .catch((err) => {
    console.log('logout error', err);
  })
}


  render() {
    return (
      <div>
        <h1>  Welcome to Shark Fin </h1>
        <div> The gamified stock market experience</div>

        {!this.props.user ?
        (<div>
          <GoogleLogin onSuccess={this.responseMessage.bind(this)} onError={this.errorMessage.bind(this)} />
        </div>)
        :  <button onClick={this.logout}>Log out</button>

        }
      </div>
    )
  }
}

export default Login;


    //  // <div>


    //     {/* <Button variant="contained" color="primary">Sign in with Google</Button>
    //     <div>
    //       <FormControlLabel
    //             control={<Checkbox value="remember" color="primary" />}
    //             label="Keep me logged in for up to 30 days"
    //       />
    //     </div> */}
    //   /* </div> */


//      {/* <div id="g_id_onload"
//      data-client_id="179471030955-dm54jupbl4nol6udsjbgb2nb3od21bdm.apps.googleusercontent.com"
//      data-context="signin"
//      data-ux_mode="popup"
//      data-login_uri="/test1"
//      data-auto_prompt="false">
// </div>

// <div class="g_id_signin"
//      data-type="standard"
//      data-shape="rectangular"
//      data-theme="outline"
//      data-text="signin_with"
//      data-size="large"
//      data-logo_alignment="left">
// </div> */}