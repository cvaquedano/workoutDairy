import { OBTENER_CHECKPOINTS,
    AGREGAR_CHECKPOINT,
    VALIDAR_CHECKPOINT,
    SALVAR_CHECKPOINT,
    CHECKPOINT_ACTUAL,
    ELIMINAR_CHECKPOINT,
    CHECKPOINT_ERROR
    } from "../../types";

export default (state, action) => {
    switch(action.type) {
        case OBTENER_CHECKPOINTS:
           return {
                ...state,
                checkPoints : action.payload
            };

        case AGREGAR_CHECKPOINT:
            return {
                ...state,
                checkPoints: [action.payload.data, ...state.checkPoints],
                mensaje: action.payload.alerta,
                errorCheckPoint: false,
            };

        case SALVAR_CHECKPOINT:
            return {
                ...state,
                checkPoints : state.checkPoints
                .map(checkPoint =>
                    checkPoint._id === action.payload.data._id
                    ? checkPoint : action.payload.data ),
                    mensaje: action.payload.alerta,
                    checkPointActual : null
            };

        case VALIDAR_CHECKPOINT:
            return {
                ...state,
                errorCheckPoint: true,
                mensaje: action.payload
            };

        case CHECKPOINT_ACTUAL:

            return {
                ...state,
                checkPointActual: state.checkPoints
                    .filter(checkPoint =>
                        checkPoint._id === action.payload
                        )[0]
            };
        case ELIMINAR_CHECKPOINT:
        return {
            ...state,
            checkPoints: state.checkPoints
                    .filter(checkPoint =>
                        checkPoint._id !== action.payload.id
                        ),
            mensaje: action.payload.alerta,
            checkPointActual: null
        };

        case CHECKPOINT_ERROR:
            return {
                ...state,
                mensaje: action.payload
            };

        default:
            return state;
    }
}