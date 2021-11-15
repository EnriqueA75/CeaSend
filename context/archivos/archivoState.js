import React, { useReducer } from 'react';
import archivoContext from './archivoContext'
import archivoReducer from './archivoReducer'
import { SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, CREAR_ENLACE_EXITO, CREAR_ENLACE_ERROR, MOSTRAR_ALERTA, OCULTAR_ALERTA, SUBIR_ARCHIVO } from '../../types';
import clienteAxios from '../../config/axios';

const ArchivoState = ({children}) => {
    //satate inicial
    const initialState = {
       alerta: '',
       nombre: '',
       nombre_original: '',
       cargando: null
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

    const subirArchivos = async (formData, acceptedFile) => {
        dispatch({
            type: SUBIR_ARCHIVO,
        })
        try {
            const resultado = await clienteAxios.post('/api/archivos', formData)
            console.log(resultado)
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: acceptedFile
                }
            })
        } catch (error) {
            dispatch({ 
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }
   
    return ( 
        <archivoContext.Provider
            value={{
                mostrarAlerta,
                subirArchivos,
                alerta: state.alerta,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando
            }}
        >
            {children}
        </archivoContext.Provider>
     );
}
export default ArchivoState;