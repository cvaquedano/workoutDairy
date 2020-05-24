import React, { useEffect, useContext } from 'react';
import CheckPoint from './CheckPoint';
import checkpointContext from '../../context/checkPoint/checkPointContext';
import AlertaContext from '../../context/alertas/alertaContext';

const CheckPointList = () => {

    const checkPointsContext = useContext(checkpointContext);
    const {checkPoints, obtenerCheckPoints} = checkPointsContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    useEffect(() => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        obtenerCheckPoints();
        // eslint-disable-next-line
    }, [mensaje]);

    if(checkPoints.length === 0) return <p>No hay check points, comienza creando uno</p>;
        return (
        <div
            className='listado-checkpoints'
        >
            {alerta ? (<Error mensaje={alerta.msg}/>)  : null}

            {checkPoints.map(checkPoint =>(

                <CheckPoint
                key={checkPoint.id}
                checkPoint={checkPoint}/>
            ))}
       </div>
    );
};

export default CheckPointList;