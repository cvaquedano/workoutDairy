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
        
        default:
            return state;
    }
}