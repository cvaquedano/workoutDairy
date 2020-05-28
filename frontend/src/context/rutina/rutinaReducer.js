import { OBTENER_RUTINAS,
    AGREGAR_RUTINA,
    VALIDAR_RUTINA,
    SALVAR_RUTINA,
    RUTINA_ACTUAL,
    ELIMINAR_RUTINA,
    RUTINA_ERROR
    } from "../../types";
export default (state, action) => {
    switch(action.type) {
        case OBTENER_RUTINAS:
           return {
                ...state,
                rutinas : action.payload
            };

        case AGREGAR_RUTINA:
            return {
                ...state,
                rutinas: [action.payload.data, ...state.rutinas],
                mensaje: action.payload.alerta,
                errorRutina: false,
            };

        case SALVAR_RUTINA:
            return {
                ...state,
                rutinas : state.rutinas
                .map(rutina =>
                    rutina._id === action.payload.data._id
                    ? rutina : action.payload.data ),
                    mensaje: action.payload.alerta,
                    rutinaActual : null
            };

        case VALIDAR_RUTINA:
            return {
                ...state,
                errorRutina: true,
                mensaje: action.payload
            };

        case RUTINA_ACTUAL:

            return {
                ...state,
                rutinaActual: state.rutinas
                    .filter(rutina =>
                        rutina._id === action.payload
                        )[0]
            };
        case ELIMINAR_RUTINA:
        return {
            ...state,
            rutinas: state.rutinas
                    .filter(rutina =>
                        rutina._id !== action.payload.id
                        ),
            mensaje: action.payload.alerta,
            rutinaActual: null
        };

        case RUTINA_ERROR:
            return {
                ...state,
                mensaje: action.payload
            };

        default:
            return state;
    }
}