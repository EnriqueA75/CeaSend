import React from 'react';
import AuthState from "../context/auth/authState";
import ArchivoState from "../context/archivos/archivoState";

const Myapp = ({ Component, pageProps }) => {
    return (
        <ArchivoState>
            <AuthState>
                <Component {...pageProps}/>
            </AuthState>
        </ArchivoState>
    )
}

export default Myapp