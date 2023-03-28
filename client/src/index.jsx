import React from "react";
import ReactDOM from 'react-dom/client';
import App from './components/app.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId="179471030955-dm54jupbl4nol6udsjbgb2nb3od21bdm.apps.googleusercontent.com">
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </GoogleOAuthProvider>
)
