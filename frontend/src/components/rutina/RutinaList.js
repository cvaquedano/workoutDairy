import React, { useEffect, useContext } from 'react';
import Rutina from './Rutina';
import rutinaContext from '../../context/rutina/rutinaContext';
import AlertaContext from '../../context/alertas/alertaContext';

import Error from '../Error';

const RutinaList = (props) => {

    const rutinasContext = useContext(rutinaContext);
    const {rutinas,mensaje, obtenerRutinas} = rutinasContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;


    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.severity, mensaje.title);
        }
        obtenerRutinas();
        // eslint-disable-next-line
    }, [mensaje]);

    if(rutinas.length === 0) return <p>No hay check points, comienza creando uno</p>;
        return (
        <div
            className='listado-rutinas'
        >
            {alerta ? (<Error alerta={alerta}/>)  : null}

            {rutinas.map(rutina =>(

                <Rutina
                key={rutina._id}
                props={props}
                rutina={rutina}/>
            ))}
       </div>
    );
};

export default RutinaList;