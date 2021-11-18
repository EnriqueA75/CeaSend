import { MOSTRAR_ALERTA, OCULTAR_ALERTA, SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, SUBIR_ARCHIVO, CREAR_ENLACE_EXITO, LIMPIAR_STATE, AGREGAR_PASSWORD, AGREGAR_DESCARGAS  } from '../../types';

export default (state, action) => {
    switch(action.type){
        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original.name,
                cargado: null
            }
        case SUBIR_ARCHIVO_ERROR: 
            return {
                ...state,
                alerta: action.payload,
                cargado: null
            }
        case SUBIR_ARCHIVO: 
            return {
                ...state,
                cargado: true
            }
        case CREAR_ENLACE_EXITO:
            return {
                ...state,
                url: action.payload
            }
        case LIMPIAR_STATE:
            return {
                ...state,
                alerta: null,
                nombre: '',
                nombre_original: '',
                cargando: null,
                descargas: 1,
                password: '',
                autor: '',
                url: ''
            }
        case AGREGAR_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case AGREGAR_DESCARGAS:
            return {
                ...state,
                descargas: action.payload
            }
        default: 
            return state
    }
} 