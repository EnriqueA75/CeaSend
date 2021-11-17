import { REGISTRO_EXITOSO, REGISTRO_FALLIDO, LIMPIAR_ALERTA,INICIO_EXITOSO, INICIO_FALLIDO, USUARIO_AUTENTICADO, CERRAR_SESION } from '../../types';

export default (state, action) => {
    switch(action.type){

        case REGISTRO_FALLIDO:
        case REGISTRO_EXITOSO:
        case INICIO_FALLIDO:
            return {
                ...state,
                mensaje: action.payload,
                autenticado: true
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case INICIO_EXITOSO:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                autenticado: true
            }
        case USUARIO_AUTENTICADO: 
            return {
                ...state,
                usuario: action.payload,
                autenticado: true
            }
        case CERRAR_SESION:
            localStorage.removeItem('token')
            return {
                ...state,
                usuario: null,
                autenticado: null,
                token: null
            }
        default: 
            return state
    }
}