import React, { useEffect, useContext } from 'react';
import CheckPoint from './CheckPoint';
import checkpointContext from '../../context/checkPoint/checkPointContext';
const CheckPointList = () => {

    const checkPointsContext = useContext(checkpointContext);
    const {checkPoints, obtenerCheckPoints} = checkPointsContext;

    useEffect(() => {
        obtenerCheckPoints();
        // eslint-disable-next-line
    }, []);

    if(checkPoints.length === 0) return <p>No hay check points, comienza creando uno</p>;
        return (
        <div
            className='listado-checkpoints'
        >

            {checkPoints.map(checkPoint =>(

                <CheckPoint
                key={checkPoint.id}
                checkPoint={checkPoint}/>
            ))}
       </div>
    );
};

export default CheckPointList;