import React, { useReducer } from 'react';
import archivoContext from './archivoContext'
import archivoReducer from './archivoReducer'
import {SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, CREAR_ENLACE_EXITO, CREAR_ENLACE_ERROR, MOSTRAR_ALERTA} from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const ArchivoState = ({children}) => {
    //satate inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    }
    //definir el reducer
    const [state, dispatch] = useReducer(archivoContext, archivoReducer)

   
    return ( 
        <authContext.Provider
            value={{
                token: state.token,      
            }}
        >
            {children}
        </authContext.Provider>
     );
}
export default ArchivoState;