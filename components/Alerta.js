import React, { useContext } from 'react';
import authContext from '../context/auth/authContext';
import archivoContext from '../context/archivos/archivoContext'

const Alerta = () => {
    //mensaje de error para usuarios
    const AuthContext = useContext(authContext)
    const { mensaje } = AuthContext
    //mensaje de error para archivos
    const ArchivoContext = useContext(archivoContext)
    const { alerta } = ArchivoContext


    return ( 
        <div className={`bg-red-500 text-center py-2 px-3 w-full my-3 max-w-lg text-white mx-auto`}>
            {mensaje || alerta} 
        </div>
     );
}
 
export default Alerta;