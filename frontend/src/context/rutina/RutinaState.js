import React, { useReducer } from 'react';
//import {v4 as uuidv4} from 'uuid';

import { OBTENER_RUTINAS,
    AGREGAR_RUTINA,
    VALIDAR_RUTINA,
    SALVAR_RUTINA,
    RUTINA_ACTUAL,
    ELIMINAR_RUTINA,
    RUTINA_ERROR
    } from "../../types";
import rutinaReducer from './rutinaReducer';
import rutinaContext from './rutinaContext';
import clienteAxios from '../../config/axios';

const RutinaState = props => {

    const initialState = {
        rutinas : [],
       errorRutina:false,
       rutinaActual: null,
       mensaje: null
   };

   // Dispact para ejecutar las acciones
   const [state, dispatch] = useReducer(rutinaReducer,initialState);

   const obtenerRutinas = async () => {

    try {
        const resultado = await clienteAxios.get('/api/rutinas');

        dispatch({
               type : OBTENER_RUTINAS,
               payload: resultado.data.rutinas
           });

    } catch (error) {
        const alerta = {
            msg: 'Hubo un error', // error.response.data.msg,
            severity: 'error',
            title: 'Error'
        }
        dispatch({
            type: RUTINA_ERROR,
            payload: alerta
        });
    }



   };
   const agregarRutinas = async (rutina) => {

        let alerta = {
            msg: 'Registro Agregado', // error.response.data.msg,
            severity: 'success',
            title: 'Success'
        };
        try {
            const resultado = await clienteAxios.post('/api/rutinas', rutina);

            const payload = {
                data : resultado.data,
                alerta : alerta
            }

            dispatch({
                type:AGREGAR_RUTINA,
                payload
            })
        } catch (error) {
            alerta = {
                msg: error,//'Hubo un error',
                severity: 'error',
                title: 'Error'
            }
            dispatch({
                type: RUTINA_ERROR,
                payload: alerta
            });
        }

    };
    const validarRutina = (msg) => {
        const alerta = {
            msg,
            severity: 'error',
            title: 'Error'
        }
        dispatch({
            type : VALIDAR_RUTINA,
            payload: alerta
        });
    };

    const setRutina = (id) => {
        dispatch({
            type : RUTINA_ACTUAL,
            payload: id
        });
    };

    const salvarRutina = async rutina => {

        let alerta = {
            msg: 'Registro Actualizado',
            severity: 'success',
            title: 'Success'
        };
        try {
            const resultado = await clienteAxios.put(`/api/rutinas/${rutina._id}`, rutina);

            const payload = {
                data : resultado.data,
                alerta : alerta
            }

            dispatch({
                type:SALVAR_RUTINA,
                payload
            })
        } catch (error) {
             alerta = {
                msg: 'Hubo un error',
                severity: 'error',
                title: 'Error'
            }
            dispatch({
                type: RUTINA_ERROR,
                payload: alerta
            });
        }

    }

    const eliminarRutina = async (id) => {

        let alerta = {
            msg: 'Registro Eliminado', // error.response.data.msg,
            severity: 'success',
            title: 'Success'
        }
        try {
            await clienteAxios.delete(`/api/rutinas/${id}`);

            const payload = {
                id,
                alerta : alerta
            }

            dispatch({
                type: ELIMINAR_RUTINA,
                payload
            });

        } catch (error) {
             alerta = {
                msg: 'Hubo un error', // error.response.data.msg,
                severity: 'error',
                title: 'Error'
            };
            dispatch({
                type: RUTINA_ERROR,
                payload: alerta
            });
        }
    };
    return (
        <rutinaContext.Provider
            value={{
                rutinas: state.rutinas,
                errorRutina : state.errorRutina,
                rutinaActual : state.rutinaActual,
                mensaje : state.mensaje,

                obtenerRutinas,
                agregarRutinas,
                validarRutina,
                setRutina,
                salvarRutina,
                eliminarRutina
            }}
        >
            {props.children}
        </rutinaContext.Provider>
    );
};

export default RutinaState;