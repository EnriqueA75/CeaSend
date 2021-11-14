import React from 'react';
import AuthState from "../context/auth/authState";

const Myapp = ({ Component, pageProps }) => {
    return (
        <AuthState>
            <Component {...pageProps}/>
        </AuthState>
    )
}

export default Myapp