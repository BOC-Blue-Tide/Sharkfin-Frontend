import React from "react";
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import jwt_decode from "jwt-decode";
import { GoogleLogin, googleLogout } from '@react-oauth/google';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }


  responseMessage = (response) => {
    var decoded = jwt_decode(response.credential);
    console.log('success', response, decoded);

};
  errorMessage = (error) => {
    console.log(error);
};

logout = () => {

    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000";
  console.log('logout');
  googleLogout();
}

  render() {
    return (



   <div>
      <GoogleLogin onSuccess={this.responseMessage} onError={this.errorMessage} />
            <button onClick={this.logout}>Log out</button>
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