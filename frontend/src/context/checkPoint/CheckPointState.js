import React, { useReducer } from 'react';
//import {v4 as uuidv4} from 'uuid';

import { OBTENER_CHECKPOINTS,
    AGREGAR_CHECKPOINT,
    VALIDAR_CHECKPOINT,
    SALVAR_CHECKPOINT,
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
       checkPointActual: null,
       mensaje: null
   };

   // Dispact para ejecutar las acciones
   const [state, dispatch] = useReducer(checkPointReducer,initialState);

   const obtenerCheckPoints = async () => {

    try {
        const resultado = await clienteAxios.get('/api/checkPoints');

        dispatch({
               type : OBTENER_CHECKPOINTS,
               payload: resultado.data.checkPoints
           });

    } catch (error) {
        const alerta = {
            msg: 'Hubo un error', // error.response.data.msg,
            severity: 'error',
            title: 'Error'
        }
        dispatch({
            type: CHECKPOINT_ERROR,
            payload: alerta
        });
    }



   };
   const agregarCheckPoints = async (checkpoint) => {

        let alerta = {
            msg: 'Registro Agregado', // error.response.data.msg,
            severity: 'success',
            title: 'Success'
        };
        try {
            const resultado = await clienteAxios.post('/api/checkpoints', checkpoint);

            const payload = {
                data : resultado.data,
                alerta : alerta
            }

            dispatch({
                type:AGREGAR_CHECKPOINT,
                payload
            })
        } catch (error) {
            alerta = {
                msg: 'Hubo un error',
                severity: 'error',
                title: 'Error'
            }
            dispatch({
                type: CHECKPOINT_ERROR,
                payload: alerta
            });
        }

    };
    const validarCheckPoint = (msg) => {
        const alerta = {
            msg,
            severity: 'error',
            title: 'Error'
        }
        dispatch({
            type : VALIDAR_CHECKPOINT,
            payload: alerta
        });
    };

    const setCheckPoint = (id) => {
        dispatch({
            type : CHECKPOINT_ACTUAL,
            payload: id
        });
    };

    
    const salvarCheckPoint = async checkPoint => {

        let alerta = {
            msg: 'Registro Actualizado',
            severity: 'success',
            title: 'Success'
        };

        try {
            const resultado = await clienteAxios.put(`/api/checkpoints/${checkPoint._id}`, checkPoint);

            const payload = {
                data : resultado.data,
                alerta : alerta
            }

            dispatch({
                type:SALVAR_CHECKPOINT,
                payload
            })
        } catch (error) {
             alerta = {
                msg: 'Hubo un error',
                severity: 'error',
                title: 'Error'
            }
            dispatch({
                type: CHECKPOINT_ERROR,
                payload: alerta
            });
        }

    }

    const eliminarCheckPoint = async (id) => {

        let alerta = {
            msg: 'Registro Eliminado', // error.response.data.msg,
            severity: 'success',
            title: 'Success'
        }
        try {
            await clienteAxios.delete(`/api/checkpoints/${id}`);

            const payload = {
                id,
                alerta : alerta
            }

            dispatch({
                type: ELIMINAR_CHECKPOINT,
                payload
            });

        } catch (error) {
             alerta = {
                msg: 'Hubo un error', // error.response.data.msg,
                severity: 'error',
                title: 'Error'
            };
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
                checkPointActual : state.checkPointActual,
                mensaje : state.mensaje,

                obtenerCheckPoints,
                agregarCheckPoints,
                validarCheckPoint,
                setCheckPoint,
                salvarCheckPoint,
                eliminarCheckPoint
            }}
        >
            {props.children}
        </checkPointContext.Provider>
    );
};

export default CheckPointState;