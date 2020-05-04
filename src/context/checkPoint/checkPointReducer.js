import { OBTENER_CHECKPOINTS,
    AGREGAR_CHECKPOINT,
    VALIDAR_CHECKPOINT,
    CHECKPOINT_ACTUAL,
    ELIMINAR_CHECKPOINT,
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
                checkPoints: [action.payload, ...state.checkPoints],
                errorCheckPoint: false,
            };

        case VALIDAR_CHECKPOINT:
            return {
                ...state,
                errorCheckPoint: true
            };

        case CHECKPOINT_ACTUAL:
            return {
                ...state,
                checkPoint: state.checkPoints
                    .filter(checkPoint =>
                        checkPoint.id === action.payload
                        )
            };
        case ELIMINAR_CHECKPOINT:
        return {
            ...state,
            checkPoints: state.checkPoints
                    .filter(checkPoint =>
                        checkPoint.id !== action.payload
                        ),
            checkPoint: null
        };

        default:
            return state;
    }
}