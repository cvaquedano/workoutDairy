import React, { useReducer } from 'react';
//import {v4 as uuidv4} from 'uuid';

import { OBTENER_CHECKPOINTS,
    AGREGAR_CHECKPOINT,
    VALIDAR_CHECKPOINT,
    CHECKPOINT_ACTUAL,
    ELIMINAR_CHECKPOINT,
    CHECKPOINT_ERROR
    } from "../../types";
import checkPointReducer from './checkPointReducer';
import checkPointContext from './checkPointContext';
import clienteAxios from '../../config/axios';

const CheckPointState = props => {

    const initialState = {
        checkPoints : [],
       errorCheckPoint:false,
       checkPoint: null,
       mensaje: null
   };

   // Dispact para ejecutar las acciones
   const [state, dispatch] = useReducer(checkPointReducer,initialState);

   const obtenerCheckPoints = () => {

    try {
        const resultado = await clienteAxios.get('/api/checkPoints');

        dispatch({
               type : OBTENER_CHECKPOINTS,
               payload: resultado.data.checkPoints
           });

    } catch (error) {
        const alerta = {
            msg: 'Hubo un error', // error.response.data.msg,
            categoria: 'alerta-error'
        }
        dispatch({
            type: CHECKPOINT_ERROR,
            payload: alerta
        });
    }



   };
   const agregarCheckPoints = (checkpoint) => {

        try {
            const resultado = await clienteAxios.post('/api/checkpoints', checkpoint);

            dispatch({
                type:AGREGAR_CHECKPOINT,
                payload: resultado.data
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un error', // error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: CHECKPOINT_ERROR,
                payload: alerta
            });
        }

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

        try {
            await clienteAxios.delete(`/api/checkpoints/${id}`);

            dispatch({
                type: ELIMINAR_CHECKPOINT,
                payload: id
            });

        } catch (error) {
            const alerta = {
                msg: 'Hubo un error', // error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: CHECKPOINT_ERROR,
                payload: alerta
            });
        }
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