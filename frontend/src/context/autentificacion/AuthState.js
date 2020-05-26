import React, { useReducer } from 'react';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION} from '../../types';
import authReducer from './authReducer';
import authContext from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
const AuthState = props  => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const registarUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post('api/usuarios',datos);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {

            const alerta = {
                msg:  error.response.data.msg,
                severity: 'error',
                title: 'Error'
            };

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const respuesta = await clienteAxios.get('/api/auth');

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {

            const alerta = {
                msg:  error.response.data.msg,
                severity: 'error',
                title: 'Error'
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    const iniciarSesion = async datos =>{
        try {

            const respuesta = await clienteAxios.post('api/auth',datos);
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            });

            usuarioAutenticado();

        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                severity: 'error',
                title: 'Error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cierrar la sesion del usuario
    const cerrarSesion = () =>{
        dispatch({
            type: CERRAR_SESION
        });
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando : state.cargando,
                registarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    );

}

export default AuthState;