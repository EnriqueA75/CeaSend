import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import { REGISTRO_EXITOSO, REGISTRO_FALLIDO, LIMPIAR_ALERTA, INICIO_EXITOSO, INICIO_FALLIDO, USUARIO_AUTENTICADO, CERRAR_SESION } from '../../types';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {
    //satate inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }
    //definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState)

    //registrar nuevos usuarios
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos)
            console.log(respuesta.data.msg)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            });

        } catch (error) {
            dispatch({
                type: REGISTRO_FALLIDO,
                payload: error.response.data.msg
            })            
        }
        //limpia la alerta despues de 3 seg
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    const iniciarSesion = async (usuario) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', usuario)
            console.log(respuesta)
            dispatch({
                type: INICIO_EXITOSO,
                payload: respuesta.data.token
            })  
        } catch (error) {
            dispatch({
                type: INICIO_FALLIDO,
                payload: error.response.data.msg
            })     
        }
        //limpia la alerta despues de 3 seg
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //traer el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token')
        if(token){
            tokenAuth(token)
        }
        try {
            const respuesta = await clienteAxios.get('api/auth')
            if(respuesta.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: respuesta.data.usuario
                })
            }
        } catch (error) {
            console.log(error.response)
            dispatch({
                type: INICIO_FALLIDO,
                payload: 'error desde usuarioAutenticado'
            })    
        }
    }
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }
    return ( 
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
                
            }}
        >
            {children}
        </authContext.Provider>
     );
}
export default AuthState;