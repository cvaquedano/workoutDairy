import React, { useEffect, useContext } from 'react';
import CheckPoint from './CheckPoint';
import checkpointContext from '../../context/checkPoint/checkPointContext';
import AlertaContext from '../../context/alertas/alertaContext';

import Error from '../Error';

const CheckPointList = (props) => {

    const checkPointsContext = useContext(checkpointContext);
    const {checkPoints,mensaje, obtenerCheckPoints} = checkPointsContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;


    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.severity, mensaje.title);
        }
        obtenerCheckPoints();
        // eslint-disable-next-line
    }, [mensaje]);

    if(checkPoints.length === 0) return <p>No hay check points, comienza creando uno</p>;
        return (
        <div
            className='listado-checkpoints'
        >
            {alerta ? (<Error alerta={alerta}/>)  : null}

            {checkPoints.map(checkPoint =>(

                <CheckPoint
                key={checkPoint._id}
                props={props}
                checkPoint={checkPoint}/>
            ))}
       </div>
    );
};

export default CheckPointList;