import React, { useReducer } from 'react';

import { OBTENER_CHECKPOINTS,
    AGREGAR_CHECKPOINT,
    VALIDAR_CHECKPOINT,
    CHECKPOINT_ACTUAL,
    ELIMINAR_CHECKPOINT,
    } from "../../types";
import checkPointReducer from './checkPointReducer';
import checkPointContext from './checkPointContext';

const CheckPointState = props => {

    const checkPointsPreCargado = [
        {id:1, peso:125, grasa: 20, cintura: 45},
        {id:2, peso:127, grasa: 30, cintura: 50},
        {id:3, peso:122, grasa: 40, cintura: 60},
        {id:4, peso:160, grasa: 50, cintura: 70},
    ]

    const initialState = {
        checkPoints : [],
       errorCheckPoint:false,
       checkPoint: null
   };

   // Dispact para ejecutar las acciones
   const [state, dispatch] = useReducer(checkPointReducer,initialState);

   const obtenerCheckPoints = () => {
       dispatch({
           type : OBTENER_CHECKPOINTS,
           payload: checkPointsPreCargado
       })
   }
    return (
        <checkPointContext.Provider
            value={{
                checkPoints: state.checkPoints,

                obtenerCheckPoints,
            }}
        >
            {props.children}
        </checkPointContext.Provider>
    );
};

export default CheckPointState;