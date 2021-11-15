import { MOSTRAR_ALERTA, OCULTAR_ALERTA, SUBIR_ARCHIVO_EXITO, SUBIR_ARCHIVO_ERROR, SUBIR_ARCHIVO, CREAR_ENLACE_EXITO } from '../../types';

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
        default: 
            return state
    }
} 