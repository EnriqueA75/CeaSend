import React, { useReducer } from 'react';
import archivoContext from './archivoContext'
import archivoReducer from './archivoReducer'
import { SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, CREAR_ENLACE_EXITO, CREAR_ENLACE_ERROR, MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const ArchivoState = ({children}) => {
    //satate inicial
    const initialState = {
       alerta: ''
    }
    //definir el reducer
    const [state, dispatch] = useReducer(archivoReducer, initialState)

    const mostrarAlerta = (mensaje) => {
        console.log(mensaje)
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: mensaje
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA,
                dispatch: null
            })
        }, 4500)
    }
   
    return ( 
        <archivoContext.Provider
            value={{
                mostrarAlerta,
                alerta: state.alerta
            }}
        >
            {children}
        </archivoContext.Provider>
     );
}
export default ArchivoState;