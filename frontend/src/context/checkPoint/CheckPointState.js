import React, { useReducer } from 'react';
import {v4 as uuidv4} from 'uuid';

import { OBTENER_CHECKPOINTS,
    AGREGAR_CHECKPOINT,
    VALIDAR_CHECKPOINT,
    CHECKPOINT_ACTUAL,
    ELIMINAR_CHECKPOINT,
    } from "../../types";
import checkPointReducer from './checkPointReducer';
import checkPointContext from './checkPointContext';

const CheckPointState = props => {
    const today = new Date();

    const checkPointsPreCargado = [
        {id:1, peso:125, grasa: 20, cintura: 45, date : today.getFullYear()+'-'+(today.getMonth()-3)+'-'+today.getDate()},
        {id:2, peso:127, grasa: 30, cintura: 50, date : today.getFullYear()+'-'+(today.getMonth()-2)+'-'+today.getDate()},
        {id:3, peso:122, grasa: 40, cintura: 60, date : today.getFullYear()+'-'+(today.getMonth()-1)+'-'+today.getDate()},
        {id:4, peso:160, grasa: 50, cintura: 70, date : today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate()},
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
       });

   };
   const agregarCheckPoints = (checkpoint) => {

        checkpoint.id = uuidv4();
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        checkpoint.date = date;
        dispatch({
            type : AGREGAR_CHECKPOINT,
            payload: checkpoint
        });

    };
    const validarCheckPoint = () => {
        dispatch({
            type : VALIDAR_CHECKPOINT,
            payload: checkPointsPreCargado
        });
    };

    const setCheckPoint = (id) => {
        dispatch({
            type : CHECKPOINT_ACTUAL,
            payload: id
        });
    };

    const eliminarCheckPoint = (id) => {
        dispatch({
            type : ELIMINAR_CHECKPOINT,
            payload: id
        });
    };
    return (
        <checkPointContext.Provider
            value={{
                checkPoints: state.checkPoints,
                errorCheckPoint : state.errorCheckPoint,
                checkPoint : state.checkPoint,

                obtenerCheckPoints,
                agregarCheckPoints,
                validarCheckPoint,
                setCheckPoint,
                eliminarCheckPoint
            }}
        >
            {props.children}
        </checkPointContext.Provider>
    );
};

export default CheckPointState;