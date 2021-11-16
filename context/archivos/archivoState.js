import React, { useReducer } from 'react';
import archivoContext from './archivoContext'
import archivoReducer from './archivoReducer'
import { SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, CREAR_ENLACE_EXITO, CREAR_ENLACE_ERROR, MOSTRAR_ALERTA, OCULTAR_ALERTA, SUBIR_ARCHIVO, LIMPIAR_STATE } from '../../types';
import clienteAxios from '../../config/axios';

const ArchivoState = ({children}) => {
    //satate inicial
    const initialState = {
       alerta: '',
       nombre: '',
       nombre_original: '',
       cargando: null,
       descargas: 1,
       password: '',
       autor: '',
       url: ''
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
    //crea el enlace una vez que se crea el archivo
    const crearEnlace = async () => {
        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,
        }
        try {
            const resultado = await clienteAxios.post('/api/enlaces', data)
            console.log(resultado.data)
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            
        }
    }
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }
   
    return ( 
        <archivoContext.Provider
            value={{
                mostrarAlerta,
                subirArchivos,
                crearEnlace,
                limpiarState,
                alerta: state.alerta,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url
            }}
        >
            {children}
        </archivoContext.Provider>
     );
}
export default ArchivoState;