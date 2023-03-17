import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleLogin() {

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
          console.log('login')},
        onError: (error) => console.log('Login Failed:', error)
    });


    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
    };

    return (
        <div>


          {/* <button onClick={logOut}>Log out</button> */}


          <button onClick={() => login()}>Sign in with Google 🚀 </button>

        </div>
    );
}
export default GoogleLogin;